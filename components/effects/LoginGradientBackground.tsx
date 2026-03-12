'use client';

import { useEffect, useRef } from 'react';

type Vec3 = [number, number, number];

function normalizeHexColor(hex: string): Vec3 {
  const clean = hex.trim().replace('#', '');
  const parsed =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const value = Number.parseInt(parsed, 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const err = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(err || 'Shader compile failed.');
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create WebGL program.');
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const err = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(err || 'Program link failed.');
  }
  return program;
}

export default function LoginGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) return;

    const c0 = normalizeHexColor('#F8FAFF'); // white
    const c1 = normalizeHexColor('#307AF0'); // blue
    const c2 = normalizeHexColor('#93C5FD'); // light blue
    const c3 = normalizeHexColor('#6B7280'); // dark gray

    const noiseSource = `
vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289v3(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))
    +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 xx=x_*ns.x+ns.yyyy;
  vec4 yy=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(xx)-abs(yy);
  vec4 b0=vec4(xx.xy,yy.xy);
  vec4 b1=vec4(xx.zw,yy.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

    const vertexSource = `
precision highp float;
attribute vec2 a_position;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_baseColor;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
${noiseSource}

vec3 blendNormal(vec3 base, vec3 blend, float opacity){
  return blend * opacity + base * (1.0 - opacity);
}

void main() {
  v_uv = a_position * 0.5 + 0.5;
  vec2 uvNorm = v_uv * 2.0 - 1.0;
  vec2 noiseCoord = u_resolution * uvNorm * vec2(14e-5, 29e-5);
  float time = u_time * 5e-6;

  float n1 = smoothstep(0.1, 0.63,
    snoise(vec3(noiseCoord.x * 2.0 + time * 6.5, noiseCoord.y * 3.0, time * 11.3 + 15.0)) / 2.0 + 0.5
  );
  float n2 = smoothstep(0.1, 0.70,
    snoise(vec3(noiseCoord.x * 2.333 + time * 6.8, noiseCoord.y * 3.333, time * 11.6 + 25.0)) / 2.0 + 0.5
  );
  float n3 = smoothstep(0.1, 0.77,
    snoise(vec3(noiseCoord.x * 2.666 + time * 7.1, noiseCoord.y * 3.666, time * 11.9 + 35.0)) / 2.0 + 0.5
  );

  vec3 color = u_baseColor;
  color = blendNormal(color, u_c1, pow(n1, 4.0));
  color = blendNormal(color, u_c2, pow(n2, 4.0));
  color = blendNormal(color, u_c3, pow(n3, 4.0));

  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fragmentSource = `
precision highp float;
varying vec2 v_uv;
uniform vec3 u_baseColor;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec2 u_resolution;
uniform float u_time;
${noiseSource}

vec3 blendNormal(vec3 base, vec3 blend, float opacity){
  return blend * opacity + base * (1.0 - opacity);
}

void main() {
  vec2 uvNorm = v_uv * 2.0 - 1.0;
  vec2 noiseCoord = u_resolution * uvNorm * vec2(14e-5, 29e-5);
  float time = u_time * 5e-6;

  float n1 = smoothstep(0.1, 0.63,
    snoise(vec3(noiseCoord.x * 2.0 + time * 6.5, noiseCoord.y * 3.0, time * 11.3 + 15.0)) / 2.0 + 0.5
  );
  float n2 = smoothstep(0.1, 0.70,
    snoise(vec3(noiseCoord.x * 2.333 + time * 6.8, noiseCoord.y * 3.333, time * 11.6 + 25.0)) / 2.0 + 0.5
  );
  float n3 = smoothstep(0.1, 0.77,
    snoise(vec3(noiseCoord.x * 2.666 + time * 7.1, noiseCoord.y * 3.666, time * 11.9 + 35.0)) / 2.0 + 0.5
  );

  vec3 color = u_baseColor;
  color = blendNormal(color, u_c1, pow(n1, 4.0));
  color = blendNormal(color, u_c2, pow(n2, 4.0));
  color = blendNormal(color, u_c3, pow(n3, 4.0));
  gl_FragColor = vec4(color, 1.0);
}`;

    let program: WebGLProgram | null = null;
    try {
      program = createProgram(gl, vertexSource, fragmentSource);
    } catch {
      return;
    }

    const pos = gl.getAttribLocation(program, 'a_position');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uBase = gl.getUniformLocation(program, 'u_baseColor');
    const u1 = gl.getUniformLocation(program, 'u_c1');
    const u2 = gl.getUniformLocation(program, 'u_c2');
    const u3 = gl.getUniformLocation(program, 'u_c3');

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]),
      gl.STATIC_DRAW
    );

    gl.useProgram(program);
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    gl.uniform3fv(uBase, c0);
    gl.uniform3fv(u1, c1);
    gl.uniform3fv(u2, c2);
    gl.uniform3fv(u3, c3);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    let raf = 0;
    let t = 1253106;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min(now - last, 1000 / 15);
      last = now;
      t += dt;
      gl.uniform1f(uTime, t);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = window.requestAnimationFrame(render);
    };

    resize();
    raf = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(raf);
      if (program) gl.deleteProgram(program);
      if (buf) gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="login-gradient-canvas" />
      <div className="login-gradient-fade" />
    </>
  );
}
