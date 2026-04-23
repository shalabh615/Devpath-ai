import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  useEffect(() => {
    // Ensure THREE.js is loaded
    if (!window.THREE) {
      const s = document.createElement('script');
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.onload = initThree;
      document.body.appendChild(s);
    } else {
      initThree();
    }

    let reqId;

    function initThree() {
      var bgCv = document.getElementById('auth-bg');
      if(!bgCv) return;
      var rdr = new THREE.WebGLRenderer({ canvas: bgCv, alpha: true, antialias: true });
      rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
      rdr.setClearColor(0x000000, 0); 
      rdr.setSize(window.innerWidth, window.innerHeight);
      
      var sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 1000);
      cam.position.z = 28;
      
      // Particles
      var N = 4500, pg = new THREE.BufferGeometry();
      var pp2 = new Float32Array(N * 3), pc = new Float32Array(N * 3);
      var pal = [[.2,.1,.8],[.05,.4,.6],[.4,.1,.7],[.8,.4,.0],[.1,.5,.3],[.8,.2,.4]];
      for (var i = 0; i < N; i++) {
        var i3 = i * 3, c2 = pal[Math.floor(Math.random() * pal.length)];
        pp2[i3] = (Math.random() - .5) * 130; pp2[i3+1] = (Math.random() - .5) * 90; pp2[i3+2] = (Math.random() - .5) * 70 - 10;
        pc[i3] = c2[0]; pc[i3+1] = c2[1]; pc[i3+2] = c2[2];
      }
      pg.setAttribute('position', new THREE.BufferAttribute(pp2, 3));
      pg.setAttribute('color', new THREE.BufferAttribute(pc, 3));
      var pm = new THREE.PointsMaterial({ size: .14, vertexColors: true, transparent: true, opacity: .5, sizeAttenuation: true, blending: window.THREE.NormalBlending, depthWrite: false });
      var parts = new THREE.Points(pg, pm); sc.add(parts);

      var t = 0;
      
      function animate() {
        reqId = requestAnimationFrame(animate); 
        t += .004;
        parts.rotation.y = t * .1; 
        parts.rotation.x = t * .05;
        rdr.render(sc, cam);
      }
      animate();
      
      // Window resize handler
      const onResize = () => {
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
        rdr.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);
      window._authResize = onResize;
    }

    return () => {
      if(reqId) cancelAnimationFrame(reqId);
      if(window._authResize) window.removeEventListener('resize', window._authResize);
    };
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Save token and user
      localStorage.setItem('cf_token', data.token);
      localStorage.setItem('cf_user', JSON.stringify(data.user));
      
      // Navigate to Home
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <canvas id="auth-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}></canvas>
      <div className="auth-card" style={{ position: 'relative', zIndex: 1 }}>
        <div className="auth-header">
          <div className="logo" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', display: 'inline-block' }}>DevpathAI</div>
          <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Log in to access your roadmaps and AI tools.' 
              : 'Join DevpathAI and accelerate your career journey.'}
          </p>
        </div>

        {error && <div className="auth-err">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={name}
                onChange={e => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="auth-field">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="auth-field">
            <label>Password</label>
            <input 
              type="password" 
              placeholder={isLogin ? 'Your password' : 'Min 6 characters'} 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up free' : 'Log in here'}
          </span>
        </div>
      </div>
    </div>
  );
}
