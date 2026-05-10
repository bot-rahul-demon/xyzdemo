// Router functionality
class Router {
  constructor() {
    this.routes = {
      '/': this.renderLanding.bind(this),
      '/category/:category': this.renderCategory.bind(this),
      '/test/:testId': this.renderTestPlayer.bind(this),
      '/result/:testId': this.renderResult.bind(this),
      '/leaderboard/:testId': this.renderLeaderboard.bind(this)
    };
    this.currentRoute = '/';
    this.currentParams = {};
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.navigate(location.pathname));
    this.navigate(location.pathname);
  }

  navigate(path) {
    this.currentRoute = path;
    for (const route in this.routes) {
      const pattern = route.replace(/:([a-zA-Z]+)/g, '([^/]+)');
      const regex = new RegExp(`^${pattern}$`);
      const match = path.match(regex);
      if (match) {
        const keys = route.match(/:([a-zA-Z]+)/g) || [];
        this.currentParams = {};
        keys.forEach((key, idx) => {
          this.currentParams[key.slice(1)] = match[idx + 1];
        });
        this.routes[route]();
        window.history.pushState({}, '', path);
        return;
      }
    }
    this.renderLanding();
  }

  link(path) {
    return (e) => {
      e.preventDefault();
      this.navigate(path);
    };
  }

  renderLanding() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <nav>
        <div class="navbar-content">
          <a href="/" class="logo" style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003366, #FF8C00); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">MS</div>
            <span style="font-weight: 600; font-size: 18px;">MockSaathi</span>
          </a>

          <div class="nav-links">
            <a href="/" onclick="return router.link('/')(event)">Home</a>
            <a href="/category/ssc" onclick="return router.link('/category/ssc')(event)">SSC</a>
            <a href="/category/banking" onclick="return router.link('/category/banking')(event)">Banking</a>
            <a href="/category/railways" onclick="return router.link('/category/railways')(event)">Railways</a>
            <a href="/category/regulatory" onclick="return router.link('/category/regulatory')(event)">Regulatory</a>
            <button class="btn btn-primary btn-sm">Login</button>
          </div>

          <button class="menu-btn" onclick="toggleMobileMenu()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <section style="background: linear-gradient(to bottom right, #eff6ff, white, #fff7ed); padding: 3rem 0; position: relative; overflow: hidden;">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center;" class="lg\:grid-cols-2">
            <div>
              <div style="display: inline-block; background: rgba(0, 51, 102, 0.1); color: #003366; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; margin-bottom: 1rem;">
                🎯 Your Mock Test Buddy
              </div>
              <h1 style="margin-bottom: 1.5rem; line-height: 1.2;">
                Ace Your Government Exam with <span style="color: #FF8C00;">Free Mock Tests</span>
              </h1>
              <p style="font-size: 1.125rem; color: #6b7280; margin-bottom: 2rem;">
                Practice with high-quality mock tests designed by experts. Track your performance and improve your rank.
              </p>

              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;" class="sm\:flex-row">
                <a href="/category/ssc" onclick="router.link('/category/ssc')(event)" class="btn btn-primary btn-lg" style="text-align: center;">
                  ▶ Start Free Test
                </a>
                <button class="btn btn-outline btn-lg" onclick="document.getElementById('categories').scrollIntoView({behavior: 'smooth'})">
                  Explore Courses
                </button>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                  <svg class="w-5 h-5" style="width: 1.25rem; height: 1.25rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
                  <span>Trusted by 2M+ Students</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                  <svg style="width: 1.25rem; height: 1.25rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span>Expert-Designed Content</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                  <svg style="width: 1.25rem; height: 1.25rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span>Updated Daily</span>
                </div>
              </div>
            </div>

            <div class="hidden lg\:block">
              <div style="background: white; border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); padding: 2rem; border: 2px solid rgba(0, 51, 102, 0.1);">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                  <div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #eff6ff, #dbeafe); border-radius: 0.75rem;">
                    <svg style="width: 2rem; height: 2rem; margin: 0 auto 0.5rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path></svg>
                    <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">2M+</div>
                    <div style="font-size: 0.875rem; color: #6b7280;">Active Users</div>
                  </div>
                  <div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #fff7ed, #ffedd5); border-radius: 0.75rem;">
                    <svg style="width: 2rem; height: 2rem; margin: 0 auto 0.5rem; color: #FF8C00;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
                    <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">500+</div>
                    <div style="font-size: 0.875rem; color: #6b7280;">Mock Tests</div>
                  </div>
                  <div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #eff6ff, #dbeafe); border-radius: 0.75rem;">
                    <svg style="width: 2rem; height: 2rem; margin: 0 auto 0.5rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">95%</div>
                    <div style="font-size: 0.875rem; color: #6b7280;">Success Rate</div>
                  </div>
                  <div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, #fff7ed, #ffedd5); border-radius: 0.75rem;">
                    <svg style="width: 2rem; height: 2rem; margin: 0 auto 0.5rem; color: #FF8C00;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">10K+</div>
                    <div style="font-size: 0.875rem; color: #6b7280;">Selections</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="animate-bounce" style="text-align: center; position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: none;" class="md\:block">
          <button onclick="document.getElementById('categories').scrollIntoView({behavior: 'smooth'})" style="background: none; border: none; cursor: pointer; color: #003366; opacity: 0.6; transition: opacity 0.2s;">
            <svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </div>
      </section>

      <section id="categories" style="max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="margin-bottom: 1rem;">Choose Your Exam Category</h2>
          <p style="color: #6b7280; font-size: 1.125rem;">Select your target exam and start practicing today</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;" class="sm\:grid-cols-2 md\:grid-cols-4">
          ${['SSC', 'Banking', 'Railways', 'Regulatory'].map((cat, idx) => `
            <div class="card clickable" style="border: 2px solid ${['#bfdbfe', '#fed7aa', '#bfdbfe', '#fed7aa'][idx]}" onclick="router.link('/category/${cat.toLowerCase()}')(event)">
              <div style="width: 3rem; height: 3rem; border-radius: 0.75rem; ${['bg-blue-50', 'bg-orange-50', 'bg-blue-50', 'bg-orange-50'][idx]}; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <svg style="width: 1.75rem; height: 1.75rem; color: ${['#003366', '#FF8C00', '#003366', '#FF8C00'][idx]};" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
              </div>
              <h3>${cat}</h3>
              <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">
                ${cat === 'SSC' ? 'Staff Selection Commission' : cat === 'Banking' ? 'IBPS, SBI, RBI Exams' : cat === 'Railways' ? 'RRB, Railway Exams' : 'SEBI, RBI Grade B'}
              </p>
              <div style="display: flex; align-items: center; gap: 0.5rem; color: #003366;">
                <svg style="width: 1rem; height: 1rem;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
                <span style="font-size: 0.875rem;">${[45, 38, 32, 24][idx]} Tests Available</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="background: white; padding: 3rem 1.5rem;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 3rem;">
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #fee2e2; color: #b91c1c; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; margin-bottom: 1rem;">
              <svg style="width: 1rem; height: 1rem; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="1"></circle></svg>
              Live Tests Ongoing
            </div>
            <h2 style="margin-bottom: 1rem;">Join Live Mock Tests</h2>
            <p style="color: #6b7280; font-size: 1.125rem;">Test yourself with students across India in real-time</p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;" class="md\:grid-cols-3">
            ${[
              {name: 'SSC CGL Tier 1 Live Mock', questions: 100, duration: 60, liveCount: 234},
              {name: 'IBPS PO Prelims Live Test', questions: 100, duration: 60, liveCount: 187},
              {name: 'RRB NTPC Mock Test', questions: 100, duration: 90, liveCount: 156}
            ].map((test, idx) => `
              <div class="card" style="border: 2px solid #fee2e2;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                  <span style="font-size: 0.75rem; background: #ef4444; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; display: flex; align-items: center; gap: 0.25rem; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;">
                    <div style="width: 0.5rem; height: 0.5rem; background: white; border-radius: 9999px;"></div>
                    Live Now
                  </span>
                  <span style="font-size: 0.75rem; background: #dcfce7; color: #15803d; padding: 0.25rem 0.75rem; border-radius: 9999px;">FREE</span>
                </div>
                <h3 style="margin-bottom: 1rem;">${test.name}</h3>
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                    <svg style="width: 1rem; height: 1rem;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
                    <span>${test.questions} Questions</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                    <svg style="width: 1rem; height: 1rem;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-7a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"></path></svg>
                    <span>${test.duration} Minutes</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
                    <svg style="width: 1rem; height: 1rem; color: #ef4444;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 18c0-1 1-4 6-4s6 3 6 4v1H3v-1c0-1 1-4 6-4s6 3 6 4z"></path></svg>
                    <span style="color: #dc2626;">${test.liveCount} Taking Now</span>
                  </div>
                </div>
                <a href="/test/${idx+1}" onclick="router.link('/test/${idx+1}')(event)" class="btn btn-secondary" style="width: 100%; text-align: center;">Join Now</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <footer style="border-top: 1px solid #e5e7eb; background: white; margin-top: 5rem; padding: 2rem 1.5rem;">
        <div class="container">
          <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 2rem;" class="md\:grid-cols-4">
            <div class="sm\:col-span-2 md\:col-span-1">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; margin-bottom: 1rem;">
                <div style="width: 30px; height: 30px; background: linear-gradient(135deg, #003366, #FF8C00); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">MS</div>
                MockSaathi
              </div>
              <p style="font-size: 0.875rem; color: #6b7280;">Your trusted mock test buddy for government exams</p>
            </div>
            <div>
              <h3 style="margin-bottom: 1rem; font-size: 1rem;">Exams</h3>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">SSC</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Banking</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Railways</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Regulatory</p>
              </div>
            </div>
            <div>
              <h3 style="margin-bottom: 1rem; font-size: 1rem;">Resources</h3>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Mock Tests</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Previous Papers</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Study Material</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Current Affairs</p>
              </div>
            </div>
            <div>
              <h3 style="margin-bottom: 1rem; font-size: 1rem;">Company</h3>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">About Us</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Contact</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Privacy Policy</p>
                <p style="font-size: 0.875rem; color: #6b7280; cursor: pointer;">Terms of Service</p>
              </div>
            </div>
          </div>
          <div style="text-align: center; color: #6b7280; font-size: 0.875rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
            <p>© 2026 MockSaathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }

  renderCategory() {
    const category = this.currentParams.category;
    const app = document.getElementById('app');

    const subcategories = {
      ssc: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC CPO'],
      banking: ['IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'RBI Grade B'],
      railways: ['RRB NTPC', 'RRB Group D', 'RRB JE', 'RRB ALP'],
      regulatory: ['SEBI Grade A', 'RBI Grade B', 'NABARD', 'IRDA']
    };

    const tests = [
      {id: 1, name: 'SSC CGL Tier 1 Full Mock Test', difficulty: 'medium', questions: 100, duration: 60, attempts: 12453, free: true, lang: 'English & Hindi'},
      {id: 2, name: 'SSC CGL Quantitative Aptitude', difficulty: 'hard', questions: 50, duration: 30, attempts: 8765, free: true, lang: 'English'},
      {id: 3, name: 'SSC CGL General Awareness', difficulty: 'easy', questions: 50, duration: 30, attempts: 10234, free: false, lang: 'English & Hindi'},
      {id: 4, name: 'SSC CGL English Language', difficulty: 'medium', questions: 50, duration: 30, attempts: 9876, free: true, lang: 'English'},
      {id: 5, name: 'SSC CGL Reasoning', difficulty: 'medium', questions: 50, duration: 30, attempts: 11234, free: true, lang: 'English & Hindi'},
      {id: 6, name: 'SSC CGL Previous Year Paper 2025', difficulty: 'hard', questions: 100, duration: 60, attempts: 15678, free: false, lang: 'English & Hindi'}
    ];

    app.innerHTML = `
      <nav>
        <div class="navbar-content">
          <a href="/" class="logo" style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003366, #FF8C00); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">MS</div>
            <span style="font-weight: 600; font-size: 18px;">MockSaathi</span>
          </a>

          <div class="nav-links">
            <a href="/" onclick="return router.link('/')(event)">Home</a>
            <a href="/category/ssc" onclick="return router.link('/category/ssc')(event)">SSC</a>
            <a href="/category/banking" onclick="return router.link('/category/banking')(event)">Banking</a>
            <a href="/category/railways" onclick="return router.link('/category/railways')(event)">Railways</a>
            <a href="/category/regulatory" onclick="return router.link('/category/regulatory')(event)">Regulatory</a>
            <button class="btn btn-primary btn-sm">Login</button>
          </div>

          <button class="menu-btn" onclick="toggleMobileMenu()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <div style="background: linear-gradient(to right, #eff6ff, white, #fff7ed); padding: 1.5rem 1.5rem 2rem; margin-bottom: 1.5rem;">
        <div class="container">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">
            <a href="/" onclick="router.link('/')(event)" style="cursor: pointer;">Home</a>
            <svg style="width: 1rem; height: 1rem;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            <span style="color: #1a1a1a;">${category.toUpperCase()}</span>
          </div>

          <h1>${category.toUpperCase()} Mock Tests</h1>
          <p style="color: #6b7280; font-size: 1.125rem;">Practice with expert-designed mock tests and boost your preparation</p>
        </div>
      </div>

      <div class="container" style="padding-bottom: 3rem;">
        <div style="margin-bottom: 2rem;">
          <h2 style="margin-bottom: 1rem; font-size: 1.25rem;">Popular Exams</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;" class="md\:grid-cols-4">
            ${(subcategories[category] || []).map(sub => `
              <div class="card" style="text-align: center;">
                <svg style="width: 2rem; height: 2rem; margin: 0 auto 0.5rem; color: #FF8C00;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
                <p>${sub}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem;">
          <button class="btn btn-primary" onclick="filterTests('all')">All Tests</button>
          <button class="btn btn-outline" onclick="filterTests('free')">Free Tests</button>
          <button class="btn btn-outline" onclick="filterTests('paid')">Premium Tests</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
          ${tests.map(test => `
            <div class="card">
              <div style="display: flex; flex-direction: column; gap: 1.5rem;" class="md\:flex-row">
                <div style="flex: 1;">
                  <div style="display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #dbeafe, #ffedd5); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      <svg style="width: 1.5rem; height: 1.5rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
                    </div>
                    <div style="flex: 1;">
                      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.5rem;">
                        <h3>${test.name}</h3>
                        <span class="badge ${test.free ? 'badge-success' : 'badge-secondary'}" style="white-space: nowrap; margin-left: 0.5rem;">${test.free ? 'FREE' : 'PRO'}</span>
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: #6b7280;">
                        <div style="display: flex; align-items: center; gap: 0.375rem;">
                          <svg style="width: 1rem; height: 1rem;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2 2 2 0 01-2-2zm12 0a2 2 0 01-2-2 1 1 0 100 2 1 1 0 000 2 2 2 0 012-2z"></path></svg>
                          <span>${test.questions} Questions</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.375rem;">
                          <svg style="width: 1rem; height: 1rem;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-7a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"></path></svg>
                          <span>${test.duration} Min</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.375rem;" class="sm\:inline">
                          <svg style="width: 1rem; height: 1rem;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 18c0-1 1-4 6-4s6 3 6 4v1H3v-1c0-1 1-4 6-4s6 3 6 4z"></path></svg>
                          <span>${(test.attempts / 1000).toFixed(1)}k</span>
                        </div>
                      </div>
                      <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">Language: ${test.lang}</p>
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; width: 100%;" class="md\:w-auto">
                  <a href="/test/${test.id}" onclick="router.link('/test/${test.id}')(event)" class="btn btn-primary" style="width: 100%; text-align: center;" class="md\:w-auto">Start Test</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderTestPlayer() {
    const testId = this.currentParams.testId;
    const app = document.getElementById('app');

    let questions = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: What is the value of x in the equation 2x + 5 = 15? This is a sample question to demonstrate the test player interface.`,
      options: ['Option A: x = 5', 'Option B: x = 10', 'Option C: x = 7.5', 'Option D: x = 2.5'],
      status: 'not-visited',
      selectedAnswer: null
    }));

    let currentQuestion = 0;
    let timeLeft = 3600;
    let showPalette = false;

    const updateTimer = () => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitTest();
      }
      updateUI();
    };

    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const updateUI = () => {
      const q = questions[currentQuestion];
      const answered = questions.filter(q => q.status === 'answered' || q.status === 'answered-flagged').length;
      const notAnswered = questions.filter(q => q.status === 'not-answered').length;
      const flagged = questions.filter(q => q.status === 'flagged' || q.status === 'answered-flagged').length;
      const notVisited = questions.filter(q => q.status === 'not-visited').length;

      document.getElementById('timer').textContent = formatTime(timeLeft);
      document.getElementById('timer').style.backgroundColor = timeLeft < 300 ? '#fee2e2' : '#dbeafe';
      document.getElementById('timer').style.color = timeLeft < 300 ? '#b91c1c' : '#003366';

      document.getElementById('question-num').textContent = `Question ${currentQuestion + 1}/${questions.length}`;
      
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button onclick="selectAnswer(${idx})" style="text-align: left; padding: 1rem; border-radius: 0.75rem; border: 2px solid ${q.selectedAnswer === idx ? '#003366' : '#e5e7eb'}; background: ${q.selectedAnswer === idx ? '#eff6ff' : '#f9fafb'}; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 1.25rem; height: 1.25rem; border-radius: 9999px; border: 2px solid ${q.selectedAnswer === idx ? '#003366' : '#d1d5db'}; ${q.selectedAnswer === idx ? 'background: #003366;' : ''} display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${q.selectedAnswer === idx ? '<div style="width: 0.5rem; height: 0.5rem; background: white; border-radius: 9999px;"></div>' : ''}
          </div>
          <span style="font-size: 1rem;">${opt}</span>
        </button>
      `).join('');

      const paletteHtml = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; margin-bottom: 1.5rem; background: #f9fafb; padding: 1rem; border-radius: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 1.25rem; height: 1.25rem; background: #003366; border-radius: 0.25rem;"></div>
            <span>Answered (${answered})</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 1.25rem; height: 1.25rem; background: #ef4444; border-radius: 0.25rem;"></div>
            <span>Skipped (${notAnswered})</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 1.25rem; height: 1.25rem; background: #f97316; border-radius: 0.25rem;"></div>
            <span>Flagged (${flagged})</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 1.25rem; height: 1.25rem; background: #e5e7eb; border-radius: 0.25rem; border: 1px solid #d1d5db;"></div>
            <span>Not Visited (${notVisited})</span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.375rem;">
          ${questions.map((q, idx) => `
            <button onclick="goToQuestion(${idx})" style="width: 2.75rem; height: 2.75rem; border-radius: 0.5rem; font-size: 0.875rem; border: none; cursor: pointer; transition: all 0.2s; ${
              idx === currentQuestion ? 'box-shadow: 0 0 0 2px #FF8C00, 0 0 0 4px white;' : ''
            } ${
              q.status === 'answered' || q.status === 'answered-flagged' ? 'background: #003366; color: white;' :
              q.status === 'not-answered' ? 'background: #ef4444; color: white;' :
              q.status === 'flagged' ? 'background: #f97316; color: white;' :
              'background: #e5e7eb; border: 1px solid #d1d5db;'
            }">${q.id}</button>
          `).join('')}
        </div>
      `;

      document.getElementById('palette').innerHTML = paletteHtml;

      const flagButton = document.getElementById('flag-btn');
      if (q.status === 'flagged' || q.status === 'answered-flagged') {
        flagButton.style.borderColor = '#f97316';
        flagButton.style.backgroundColor = '#fff7ed';
        flagButton.style.color = '#c2410c';
        flagButton.textContent = '🚩 Flagged';
      } else {
        flagButton.style.borderColor = '#e5e7eb';
        flagButton.style.backgroundColor = 'white';
        flagButton.style.color = '#1a1a1a';
        flagButton.textContent = '🚩 Flag';
      }

      document.getElementById('prev-btn').disabled = currentQuestion === 0;
      document.getElementById('next-btn').disabled = currentQuestion === questions.length - 1;
    };

    const selectAnswer = (idx) => {
      const q = questions[currentQuestion];
      questions[currentQuestion].selectedAnswer = idx;
      questions[currentQuestion].status = q.status === 'flagged' ? 'answered-flagged' : 'answered';
      updateUI();
    };

    const toggleFlag = () => {
      const q = questions[currentQuestion];
      const status = q.status;
      if (status === 'answered') questions[currentQuestion].status = 'answered-flagged';
      else if (status === 'flagged') questions[currentQuestion].status = 'not-answered';
      else if (status === 'answered-flagged') questions[currentQuestion].status = 'answered';
      else questions[currentQuestion].status = 'flagged';
      updateUI();
    };

    const goToQuestion = (idx) => {
      if (questions[currentQuestion].status === 'not-visited') {
        questions[currentQuestion].status = 'not-answered';
      }
      currentQuestion = idx;
      updateUI();
    };

    const submitTest = () => {
      if (confirm('Are you sure you want to submit the test?')) {
        router.navigate(`/result/${testId}`);
      }
    };

    const toggleMobilePalette = () => {
      showPalette = !showPalette;
      document.getElementById('palette-container').style.display = showPalette ? 'fixed' : 'hidden';
      document.getElementById('palette-overlay').style.display = showPalette ? 'block' : 'none';
    };

    app.innerHTML = `
      <div style="min-height: 100vh; display: flex; flex-direction: column; background: white;">
        <div style="border-bottom: 1px solid #e5e7eb; background: white; position: sticky; top: 0; z-index: 50; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);">
          <div style="padding: 0.75rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="lg\:hidden" onclick="toggleTestMobilePalette()" style="background: none; border: none; padding: 0.5rem; cursor: pointer; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;">
                <svg fill="currentColor" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem;"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              <h2 style="font-size: 1rem; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 0.5rem;">SSC CGL Tier 1 Mock Test</h2>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div id="timer" style="font-size: 1.25rem; padding: 0.375rem 1.25rem; border-radius: 0.5rem; background: #dbeafe; color: #003366; font-family: monospace;">00:00:00</div>
            </div>
          </div>
        </div>

        <div style="flex: 1; display: flex;">
          <div style="flex: 1; padding: 2.5rem; overflow-y: auto; background: #f8f9fa;">
            <div style="max-width: 56rem; margin: 0 auto;">
              <div style="background: white; border-radius: 0.75rem; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); border: 1px solid #e5e7eb; padding: 2rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                  <span id="question-num" style="font-size: 0.875rem; background: #dbeafe; color: #003366; padding: 0.25rem 0.75rem; border-radius: 9999px;"></span>
                  <button id="flag-btn" onclick="toggleTestFlag()" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 1rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; background: white; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;">
                    🚩 Flag
                  </button>
                </div>

                <h3 id="question-text" style="font-size: 1.125rem; margin-bottom: 2rem; line-height: 1.625;">Question text here</h3>

                <div id="options-container" style="display: grid; grid-template-columns: 1fr; gap: 0.75rem;"></div>
              </div>
            </div>
          </div>

          <div id="palette-container" style="display: none; width: 20rem; border-left: 1px solid #e5e7eb; padding: 1.5rem; overflow-y: auto; background: white; z-index: 50; position: fixed; inset-y-0; right-0; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);" class="lg\:relative lg\:shadow-none lg\:display-block">
            <div style="position: sticky; top: 0;">
              <h3 style="margin-bottom: 1rem; font-size: 1rem;">Question Palette</h3>
              <div id="palette"></div>
            </div>
          </div>

          <div id="palette-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 40; lg\:hidden;" onclick="toggleTestMobilePalette()"></div>
        </div>

        <div style="border-top: 1px solid #e5e7eb; background: white; padding: 0.75rem 1.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
          <div class="container" style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
            <button id="prev-btn" onclick="goToPrevQuestion()" class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 0.5rem;">
              ← <span class="sm\:inline">Prev</span>
            </button>

            <button onclick="submitTest()" class="btn btn-destructive btn-sm">Submit</button>

            <button id="next-btn" onclick="goToNextQuestion()" class="btn btn-primary btn-sm" style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="sm\:inline">Next</span> →
            </button>
          </div>
        </div>
      </div>
    `;

    const timerInterval = setInterval(updateTimer, 1000);
    updateUI();

    // Global functions for test player
    window.selectAnswer = selectAnswer;
    window.toggleTestFlag = toggleFlag;
    window.goToQuestion = goToQuestion;
    window.goToNextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        if (questions[currentQuestion].status === 'not-visited') {
          questions[currentQuestion].status = 'not-answered';
        }
        currentQuestion++;
        updateUI();
      }
    };
    window.goToPrevQuestion = () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        updateUI();
      }
    };
    window.submitTest = submitTest;
    window.toggleTestMobilePalette = toggleMobilePalette;
  }

  renderResult() {
    const testId = this.currentParams.testId;
    const app = document.getElementById('app');

    const result = {
      score: 72,
      total: 100,
      rank: 45,
      totalAttempts: 320,
      percentile: 92.5,
      accuracy: 85.7,
      timeTaken: 54,
      totalTime: 60,
      correct: 72,
      incorrect: 16,
      unattempted: 12
    };

    app.innerHTML = `
      <nav>
        <div class="navbar-content">
          <a href="/" class="logo" style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003366, #FF8C00); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">MS</div>
            <span style="font-weight: 600; font-size: 18px;">MockSaathi</span>
          </a>

          <div class="nav-links">
            <a href="/" onclick="return router.link('/')(event)">Home</a>
            <a href="/category/ssc" onclick="return router.link('/category/ssc')(event)">SSC</a>
            <a href="/category/banking" onclick="return router.link('/category/banking')(event)">Banking</a>
            <a href="/category/railways" onclick="return router.link('/category/railways')(event)">Railways</a>
            <a href="/category/regulatory" onclick="return router.link('/category/regulatory')(event)">Regulatory</a>
            <button class="btn btn-primary btn-sm">Login</button>
          </div>

          <button class="menu-btn" onclick="toggleMobileMenu()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <div class="container" style="max-width: 72rem; padding: 1.5rem 1.5rem 2rem;">
        <div style="background: linear-gradient(135deg, #eff6ff, white, #fff7ed); border-radius: 1.5rem; padding: 3rem; text-align: center; margin-bottom: 2rem;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 5rem; height: 5rem; border-radius: 9999px; background: white; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); margin-bottom: 1.5rem;">
            <svg style="width: 2.5rem; height: 2.5rem; color: #FF8C00;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          </div>
          <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">${result.score}<span style="font-size: 1.5rem; color: #6b7280;">/${result.total}</span></h1>
          <p style="font-size: 1.125rem; color: #003366; margin-bottom: 0.5rem;">Excellent Performance! 🎉</p>
          <p style="font-size: 1rem; color: #6b7280;">You scored better than ${result.percentile}% of test takers</p>
          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 1.5rem;">
            <button class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 0.5rem;">
              📤 Share Result
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;" class="md\:grid-cols-4">
          <div class="card" style="text-align: center; border: 2px solid #bfdbfe;">
            <div style="width: 2.5rem; height: 2.5rem; background: #dbeafe; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
              <svg style="width: 1.5rem; height: 1.5rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <p style="font-size: 1.875rem; color: #003366; margin-bottom: 0.25rem;">${result.rank}</p>
            <p style="font-size: 0.75rem; color: #6b7280;">Your Rank</p>
            <p style="font-size: 0.75rem; color: #6b7280;">out of ${result.totalAttempts}</p>
          </div>

          <div class="card" style="text-align: center; border: 2px solid #fed7aa;">
            <div style="width: 2.5rem; height: 2.5rem; background: #ffedd5; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
              <svg style="width: 1.5rem; height: 1.5rem; color: #FF8C00;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </div>
            <p style="font-size: 1.875rem; color: #FF8C00; margin-bottom: 0.25rem;">${result.percentile}%</p>
            <p style="font-size: 0.75rem; color: #6b7280;">Percentile</p>
          </div>

          <div class="card" style="text-align: center; border: 2px solid #bbf7d0;">
            <div style="width: 2.5rem; height: 2.5rem; background: #dcfce7; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
              <svg style="width: 1.5rem; height: 1.5rem; color: #16a34a;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            </div>
            <p style="font-size: 1.875rem; color: #16a34a; margin-bottom: 0.25rem;">${result.accuracy}%</p>
            <p style="font-size: 0.75rem; color: #6b7280;">Accuracy</p>
          </div>

          <div class="card" style="text-align: center; border: 2px solid #e9d5ff;">
            <div style="width: 2.5rem; height: 2.5rem; background: #f3e8ff; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
              <svg style="width: 1.5rem; height: 1.5rem; color: #9333ea;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-7a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"></path></svg>
            </div>
            <p style="font-size: 1.875rem; color: #9333ea; margin-bottom: 0.25rem;">${result.timeTaken}</p>
            <p style="font-size: 0.75rem; color: #6b7280;">Minutes Taken</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2rem;" class="md\:grid-cols-2">
          <div class="card">
            <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <svg style="width: 1.25rem; height: 1.25rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              Question Analysis
            </h2>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #f0fdf4; border-radius: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 0.75rem; height: 0.75rem; background: #003366; border-radius: 9999px;"></div>
                  <span style="font-size: 0.875rem;">Correct Answers</span>
                </div>
                <span style="font-size: 1.5rem; color: #003366;">${result.correct}</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #fef2f2; border-radius: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 0.75rem; height: 0.75rem; background: #ef4444; border-radius: 9999px;"></div>
                  <span style="font-size: 0.875rem;">Incorrect Answers</span>
                </div>
                <span style="font-size: 1.5rem; color: #dc2626;">${result.incorrect}</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 0.75rem; height: 0.75rem; background: #9ca3af; border-radius: 9999px;"></div>
                  <span style="font-size: 0.875rem;">Unattempted</span>
                </div>
                <span style="font-size: 1.5rem; color: #4b5563;">${result.unattempted}</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <svg style="width: 1.25rem; height: 1.25rem; color: #003366;" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
              Performance Comparison
            </h2>
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.5rem;">
                  <span style="color: #003366;">Your Score</span>
                  <span style="color: #003366;">${result.score}%</span>
                </div>
                <div style="width: 100%; background: #e5e7eb; border-radius: 9999px; height: 1rem; overflow: hidden;">
                  <div style="background: linear-gradient(to right, #4ade80, #16a34a); height: 1rem; transition: all 0.5s;" style="width: ${result.score}%;"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.5rem;">
                  <span>Average Score</span>
                  <span>58%</span>
                </div>
                <div style="width: 100%; background: #e5e7eb; border-radius: 9999px; height: 1rem; overflow: hidden;">
                  <div style="background: linear-gradient(to right, #60a5fa, #2563eb); height: 1rem; width: 58%;"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.5rem;">
                  <span>Top Score</span>
                  <span>96%</span>
                </div>
                <div style="width: 100%; background: #e5e7eb; border-radius: 9999px; height: 1rem; overflow: hidden;">
                  <div style="background: linear-gradient(to right, #fb923c, #ea580c); height: 1rem; width: 96%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; justify-content: center;" class="sm\:flex-row">
          <a href="/leaderboard/${testId}" onclick="router.link('/leaderboard/${testId}')(event)" class="btn btn-primary" style="text-align: center;">View Leaderboard</a>
          <a href="/category/ssc" onclick="router.link('/category/ssc')(event)" class="btn btn-outline" style="text-align: center;">Practice More Tests</a>
        </div>
      </div>
    `;
  }

  renderLeaderboard() {
    const testId = this.currentParams.testId;
    const app = document.getElementById('app');

    const leaderboard = Array.from({ length: 50 }, (_, i) => ({
      rank: i + 1,
      name: i === 44 ? 'You' : `Student ${Math.floor(Math.random() * 10000)}`,
      score: Math.max(50, 100 - i * 2 + Math.floor(Math.random() * 5)),
      percentile: (Math.max(50, 100 - i * 1.5)).toFixed(1),
      isCurrentUser: i === 44
    }));

    const getRankBadgeStyle = (rank) => {
      if (rank === 1) return 'background: linear-gradient(to right, #facc15, #ca8a04); color: white;';
      if (rank === 2) return 'background: linear-gradient(to right, #d1d5db, #6b7280); color: white;';
      if (rank === 3) return 'background: linear-gradient(to right, #fb923c, #ea580c); color: white;';
      return 'background: #f3f4f6; color: #374151;';
    };

    app.innerHTML = `
      <nav>
        <div class="navbar-content">
          <a href="/" class="logo" style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003366, #FF8C00); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">MS</div>
            <span style="font-weight: 600; font-size: 18px;">MockSaathi</span>
          </a>

          <div class="nav-links">
            <a href="/" onclick="return router.link('/')(event)">Home</a>
            <a href="/category/ssc" onclick="return router.link('/category/ssc')(event)">SSC</a>
            <a href="/category/banking" onclick="return router.link('/category/banking')(event)">Banking</a>
            <a href="/category/railways" onclick="return router.link('/category/railways')(event)">Railways</a>
            <a href="/category/regulatory" onclick="return router.link('/category/regulatory')(event)">Regulatory</a>
            <button class="btn btn-primary btn-sm">Login</button>
          </div>

          <button class="menu-btn" onclick="toggleMobileMenu()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <div style="background: linear-gradient(135deg, #eff6ff, white, #fff7ed); padding: 2rem 1.5rem 3rem;">
        <div class="container" style="max-width: 72rem;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 2.5rem; height: 2.5rem; background: white; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
              <svg style="width: 1.75rem; height: 1.75rem; color: #FF8C00;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <h1>Leaderboard</h1>
          </div>
          <p style="color: #6b7280; font-size: 1.125rem;">See how you rank against other test takers</p>
        </div>
      </div>

      <div class="container" style="max-width: 72rem; padding: 1.5rem 1.5rem 2rem;">
        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2rem;" class="sm\:grid-cols-3">
          ${leaderboard.slice(0, 3).map((entry, idx) => `
            <div class="card" style="text-align: center; border: 2px solid ${idx === 0 ? '#fbbf24' : idx === 1 ? '#d1d5db' : '#fb923c'};">
              <div style="flex-direction: column; padding: 1rem;">
                <div style="margin-bottom: 0.75rem;">
                  ${idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
                </div>
                <div style="width: 3rem; height: 3rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; font-size: 1.25rem; color: white; ${getRankBadgeStyle(entry.rank)}">
                  #${entry.rank}
                </div>
                <h3>${entry.name}</h3>
                <p style="font-size: 1.875rem; color: #003366; margin-bottom: 0.25rem;">${entry.score}/100</p>
                <p style="font-size: 0.875rem; color: #6b7280;">${entry.percentile}% Percentile</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="card" style="overflow: hidden;">
          <div style="overflow-x: auto;">
            <table style="width: 100%; min-width: 31.25rem;">
              <thead>
                <tr style="border-bottom: 2px solid #e5e7eb;">
                  <th style="text-align: left; padding: 0.75rem 1rem; font-size: 0.875rem; color: #6b7280;">Rank</th>
                  <th style="text-align: left; padding: 0.75rem 1rem; font-size: 0.875rem; color: #6b7280;">Student</th>
                  <th style="text-align: left; padding: 0.75rem 1rem; font-size: 0.875rem; color: #6b7280;">Score</th>
                  <th style="text-align: left; padding: 0.75rem 1rem; font-size: 0.875rem; color: #6b7280;">Percentile</th>
                </tr>
              </thead>
              <tbody>
                ${leaderboard.map(entry => `
                  <tr style="border-bottom: 1px solid #e5e7eb; ${entry.isCurrentUser ? 'background: #eff6ff; border-left: 4px solid #FF8C00;' : ''}">
                    <td style="padding: 0.75rem 1rem;">
                      <div style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; font-size: 1rem; color: white; ${getRankBadgeStyle(entry.rank)}">
                        ${entry.rank}
                      </div>
                    </td>
                    <td style="padding: 0.75rem 1rem;">
                      <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 2.5rem; height: 2.5rem; background: linear-gradient(135deg, #dbeafe, #ffedd5); border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; flex-shrink: 0;">
                          ${entry.name.charAt(0)}
                        </div>
                        <span style="font-size: 1rem; white-space: nowrap;">
                          ${entry.name}
                          ${entry.isCurrentUser ? '<span style="margin-left: 0.5rem; font-size: 0.75rem; background: #FF8C00; color: white; padding: 0.25rem 0.5rem; border-radius: 9999px;">You</span>' : ''}
                        </span>
                      </div>
                    </td>
                    <td style="padding: 0.75rem 1rem; font-size: 1rem;">
                      <span style="color: #003366;">${entry.score}</span>/100
                    </td>
                    <td style="padding: 0.75rem 1rem; font-size: 1rem;">${entry.percentile}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize router and make it global
const router = new Router();
window.router = router;

// Utility functions
function toggleMobileMenu() {
  alert('Mobile menu toggle - implement as needed');
}

function filterTests(type) {
  alert(`Filter: ${type}`);
}
