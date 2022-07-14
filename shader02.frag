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
				abs(st.y/s.y) );	
}

void main (void) {
	float lfo = sin(u_time);
	float lfo2 = cos(u_time);
    vec3 col = vec3(0);
	//vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 st = gl_FragCoord.xy/u_resolution.xx;

	// 01: Justice
	//col += step(.5, st.x);		
	
	// 02: Streatch
	// col.r += step(.5+cos(st.y*PI-u_time)*.25, st.x);
	// col.g += step(.5+cos(st.y*PI+u_time)*.25, st.x);
	// col.b += step(.5+sin(st.y*PI+u_time)*.25, st.x);
	
	// 03: Death
	//col.r += step(.5, (st.x+st.y)*sin(u_time));
	//col.g += step(.5, (st.x+st.y)*cos(u_time));
	//col.b += step(sin(u_time), (st.x+st.y)*.5);

	// 04: The Wall
	//float s = abs(sin(u_time));
	//float w = .01;
	//col += stroke(st.x, s, w);
	//col += stroke(1.-st.y, -s, w);
	//col += stroke(st.x*st.y, s, w);
	
	// 05: Temperance
	//float offset = cos(st.y*u_time-st.x)*.15;
	//col.r += stroke(st.x, .28+offset, s);
	//col.g += stroke(st.x, .5+offset,  s*0.5);
	//col.b += stroke(st.x, .72+offset, cos(u_time));
	
	// 06: Branch
	// float sdf = .5+(st.x-st.y)*.5; // draw a diagonal by minusing uv.x and uv.y
	// col +=  stroke(sdf, .5, .1);

	// 07: The Hanged Man
	// float sdf = .5+(st.x-st.y)*.5;
	// col += stroke(sdf, .5, .1);
	// float sdf_inv = (st.x+st.y)*.5; // draw a  reversed diagonal by plussing uv.x and uv.y
	// col += stroke(sdf_inv, .5, .1);
		
	// 08: The High Priestress
	// col.r += stroke(circleSDF(st), abs(sin(u_time*.7)), .15);
	// col.g += stroke(circleSDF(st), abs(cos(u_time*.5)), .15);
	// col.b += stroke(circleSDF(st), abs(lfo), .15);
		
	// 09: The Moon
	// col +=fill(circleSDF(st), .65);
	// vec2 offset = vec2(.1, .05);
	// offset = vec2(.1*lfo, .1*lfo2);
	// col -= fill(circleSDF(st-offset), .5);

	// 10: The Emperor
	float sdf = rectSDF(st, vec2(1., .2));
	col += stroke(sdf, .5, .125);
	col += fill(sdf, abs(lfo)*.5);

	// Debugger:
	col += vec3(0.,0.7,.5);

    gl_FragColor = vec4(col,1.0);
}
