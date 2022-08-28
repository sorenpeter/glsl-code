#version 110

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_buffer0;

uniform vec2        u_mouse;
uniform vec2        u_resolution;
uniform float       u_time;

#define PI 3.1415926538

float stroke(float x, float s, float w) {
	// x is the shape drawn by the stroke
	// s is size
	// w is the width of the stroke
	float d = step(s, x+w*.5)
			- step(s, x-w*.5);
	return clamp(d, 0., 1.);
}

float circleSDF(vec2 st) {
	return length(st-.5)*2.;
}

float fill(float x, float size) {
	return 1.-step(size, x);
}

float rectSDF(vec2 st, vec2 s) {
	st = st*2. -1.;
	return max( abs(st.x/s.x),
				abs(st.y/s.y));	
}

float crossSDF(vec2 st, float s) {
	vec2 size = vec2(.25, s);
	return min( rectSDF(st,size.xy),
				rectSDF(st,size.yx));
}

float flip(float v, float pct) {
	return mix(v, 1.-v, pct);
}

void main (void) {
	float lfo = sin(u_time);
	float lfo2 = cos(u_time);
    vec3 col = vec3(0.5);
	//vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 st = gl_FragCoord.xy/u_resolution.xx;
	
	// Outliner 01
	//float rect = rectSDF(st, vec2(.75));
	//col = vec3(1.,0.,1.);
	//col.r += fill(rect, 0.5);
	//col.g += stroke(rect, 0.5, 0.1);
	
	//col = vec3(st.x, st.y, 0.);
	st = st*2. -1.;
	
	vec2 s = vec2(0.5);	
	col.g = max( abs(st.x/s.x),abs(st.y/s.y) );
	col.g = step(col.g, .5);
	
	// x is the shape drawn by the stroke
	float x = 
	float s
	float w
	// s is size
	// w is the width of the stroke
	float d = step(s, x+w*.5)
			- step(s, x-w*.5);
	return clamp(d, 0., 1.);
	
	
	
	// Debugger:
	//col += vec3(0.,0.7,.5);

    gl_FragColor = vec4(col,1.0);
}
