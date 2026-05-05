/* ============================================
   MAIN JAVASCRIPT — Portfolio Interactions
   Navigation, Modals, Lightbox, Filters, Animations
   ============================================ */

(function () {
  'use strict';

  // ==================== DOM ELEMENTS ====================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  const bookModal = document.getElementById('bookModal');
  const modalClose = document.getElementById('modalClose');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const contactForm = document.getElementById('contactForm');

  // ==================== MOBILE NAVIGATION ====================
  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ==================== NAV SCROLL BEHAVIOR ====================
  let lastScrollY = 0;
  let ticking = false;

  function updateNav() {
    var currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      nav.style.boxShadow = '0 1px 10px rgba(0,0,0,0.05)';
    } else {
      nav.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  // ==================== ACTIVE NAV LINK ====================
  var sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav__link').forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // ==================== FADE-IN ANIMATION ====================
  var fadeElements = document.querySelectorAll('.fade-in');

  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

  // ==================== FILTER BUTTONS ====================
  function initFilters(containerSelector, itemSelector) {
    var containers = document.querySelectorAll(containerSelector);

    containers.forEach(function (container) {
      var buttons = container.querySelectorAll('.filter-btn');
      var parent = container.closest('section');
      var items = parent.querySelectorAll(itemSelector);

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Update active state
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          var filter = btn.getAttribute('data-filter');

          items.forEach(function (item) {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = '';
              // Re-trigger fade-in
              setTimeout(function () {
                item.classList.add('visible');
              }, 50);
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
  }

  initFilters('.books__filter', '.book-card');
  initFilters('.writing__filter', '.writing-item');
  initFilters('.design__filter', '.design-item');

  // ==================== BOOK DETAIL MODAL ====================
  var bookData = {
    '1': {
      title: '《维特根斯坦私人笔记 1914—1916》',
      role: '校对',
      desc: '路德维希·维特根斯坦在第一次世界大战期间写下的私人笔记，记录了他从逻辑哲学向语言哲学转变的关键思想历程。黑暗时代中一份灼热的思想记录。',
      work: [
        '完成全书校对工作，确保哲学概念的准确翻译',
        '核查德文原文引文与注释',
        '协调三校流程，把控出版质量'
      ],
      result: '豆瓣评分 8.5，入选多家媒体年度哲学书单。',
      gallery: ['封面设计', '内页排版']
    },
    '2': {
      title: '《马格利特传：思想者画家》',
      role: '助理编辑',
      desc: '比利时超现实主义画家勒内·马格利特的传记。以"思想者画家"为切入点，探讨马格利特如何用绘画追问哲学命题。',
      work: [
        '协助责任编辑完成编辑加工流程',
        '参与封面设计讨论，确定视觉方向',
        '策划马格利特主题文创周边（小卡、贴纸、礼盒等）',
        '撰写电商详情页与推广文案'
      ],
      result: '上市后获得良好口碑，文创周边在书展多次售罄。',
      gallery: ['封面', '文创周边']
    },
    '3': {
      title: '《卡夫卡乡的爱因斯坦：坠入兔穴，带回宇宙》',
      role: '项目统筹',
      desc: '美国作家肯·克里姆斯坦的图像小说，以卡夫卡与爱因斯坦的虚构对话为线索，探索天才思想的诞生。',
      work: [
        '统筹整个出版项目进度',
        '协调翻译、编辑、设计各环节',
        '策划图书营销方案',
        '设计相关宣传物料'
      ],
      result: '2025年10月出版，豆瓣8.5分，入选《福布斯》年度十佳图像小说。',
      gallery: ['封面', '内页预览']
    },
    '4': {
      title: '《汉娜·阿伦特的三次逃离》',
      role: '项目统筹',
      desc: '肯·克里姆斯坦的图像小说传记，讲述汉娜·阿伦特的三次流亡与思想历程。手绘风格，兼具学术深度与艺术表现力。',
      work: [
        '统筹出版项目全流程',
        '策划全国独立书店漫游展（上海/武汉/宁波等）',
        '设计展览物料：手稿展区、特质印章、互动信纸、解谜游戏',
        '策划新书分享会并担任主持',
        '撰写活动回顾与线上推广内容'
      ],
      result: '独立书店漫游展覆盖多城，获得广泛媒体报道与读者好评。',
      gallery: ['封面', '漫游展海报', '分享会现场', '文创周边']
    },
    '5': {
      title: '《藏书票之话》众筹版本',
      role: '项目统筹',
      desc: '日本藏书票研究家斋藤昌三的经典著作中文版。以众筹方式出版，含藏书票文创周边。',
      work: [
        '统筹众筹出版项目',
        '策划藏书票主题文创周边',
        '协调翻译与出版流程',
        '设计宣传物料'
      ],
      result: '众筹成功出版，藏书票周边获得藏书爱好者好评。',
      gallery: ['封面', '藏书票文创']
    },
    '6': {
      title: '《夜：格言与随笔：1912-1919》',
      role: '编辑',
      desc: '[奥] 卡尔·克劳斯 著，吴秀杰 译。维也纳的良知、斗士和语言天才——卡尔·克劳斯作品国内首次翻译出版。卡夫卡、本雅明、卡内蒂等众多德语作家的精神养料，百年后仍具现实意义的德语文学经典。',
      work: [
        '参与编辑加工流程',
        '协调翻译与审校工作',
        '把控出版质量'
      ],
      result: '2026年1月出版，豆瓣7.4分，卡尔·克劳斯作品国内首次翻译出版。',
      gallery: ['封面']
    },
    '7': {
      title: '《匹诺曹：非存在的存在》',
      role: '编辑',
      desc: '[意] 乔吉奥·阿甘本 著，邱捷 译。跟随阿甘本，重新理解童话。科洛迪经典著作《木偶奇遇记》的另一种打开方式，揭示木偶历险故事暗藏的哲学玄机。',
      work: [
        '参与编辑加工流程',
        '协调翻译与审校工作',
        '把控出版质量'
      ],
      result: '2026年1月出版，豆瓣8.1分，阿甘本哲学视角下的童话解读。',
      gallery: ['封面']
    },
    '8': {
      title: '《白：迪恩线以西》',
      role: '编辑',
      desc: '[澳] 托尼·博奇 著，苏锑平 译。澳大利亚当代文坛讲故事大师托尼·博奇代表作，荣获澳大利亚新南威尔士州总理文学奖。迪恩线本是一条满是泥泞的土路，却成为将原住民与白人所生活的迪恩镇分隔开的界限。',
      work: [
        '参与编辑加工流程',
        '协调翻译与审校工作',
        '把控出版质量'
      ],
      result: '2026年1月出版，澳大利亚新南威尔士州总理文学奖获奖作品。',
      gallery: ['封面']
    },
    '9': {
      title: '《专名：相遇之书》',
      role: '编辑',
      desc: '[法] 伊曼纽尔·列维纳斯 著，王嘉军、张书圣、尉光吉 译。列维纳斯哲学溯源之书，列维纳斯与智识伙伴的相遇之书。书中论及了多位著名哲学家和文学家，如克尔凯郭尔、普鲁斯特等。',
      work: [
        '参与编辑加工流程',
        '协调翻译与审校工作',
        '把控出版质量'
      ],
      result: '2025年10月出版，豆瓣8.7分，列维纳斯代表作之一。',
      gallery: ['封面']
    },
    '10': {
      title: '《移情：弗洛伊德与拉康》',
      role: '编辑',
      desc: '[法] 凯瑟琳·穆勒 著，姜余、严和来 译。拉康弟子、俄狄浦斯奖获得者凯瑟琳·穆勒代表作。法国弗洛伊德精神分析协会主席帕特里克·纪尧马、《拉康十讲》作者严和来联袂推荐，一本书讲透弗洛伊德与拉康关于移情的核心观点。',
      work: [
        '参与编辑加工流程',
        '协调翻译与审校工作',
        '把控出版质量'
      ],
      result: '2025年2月出版，豆瓣8.6分，精神分析领域重要著作。',
      gallery: ['封面']
    }
  };

  // Open book modal
  function openBookModal(bookId) {
    var data = bookData[bookId];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalRole').textContent = data.role;
    document.getElementById('modalDesc').textContent = data.desc;

    var workList = document.getElementById('modalWork');
    workList.innerHTML = '';
    data.work.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      workList.appendChild(li);
    });

    document.getElementById('modalResult').textContent = data.result;

    var gallery = document.getElementById('modalGallery');
    gallery.innerHTML = '';
    data.gallery.forEach(function (item) {
      var div = document.createElement('div');
      div.className = 'placeholder';
      div.textContent = item;
      gallery.appendChild(div);
    });

    bookModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close book modal
  function closeBookModal() {
    bookModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners for book cards
  document.querySelectorAll('[data-book]').forEach(function (card) {
    card.addEventListener('click', function () {
      var bookId = this.getAttribute('data-book');
      openBookModal(bookId);
    });
  });

  modalClose.addEventListener('click', closeBookModal);
  bookModal.addEventListener('click', function (e) {
    if (e.target === bookModal) closeBookModal();
  });

  // ==================== LIGHTBOX ====================
  function openLightbox(imgSrc) {
    // For placeholder elements, we show a placeholder in lightbox
    if (imgSrc) {
      lightboxImg.src = imgSrc;
    } else {
      lightboxImg.src = '';
      lightboxImg.alt = '图片占位';
      lightboxImg.style.display = 'none';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.style.display = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = this.querySelector('img');
      if (img) {
        openLightbox(img.src);
      } else {
        openLightbox(null);
      }
    });
  });

  // Visual photos lightbox
  document.querySelectorAll('.visual__photo').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = this.querySelector('img');
      if (img) {
        openLightbox(img.src);
      } else {
        openLightbox(null);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // ==================== VISUAL TABS ====================
  var visualTabs = document.querySelectorAll('.visual__tab');
  var visualPanels = document.querySelectorAll('.visual__panel');

  visualTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetTab = this.getAttribute('data-tab');

      visualTabs.forEach(function (t) { t.classList.remove('active'); });
      visualPanels.forEach(function (p) { p.classList.remove('active'); });

      this.classList.add('active');
      document.getElementById('panel-' + targetTab).classList.add('active');
    });
  });

  // ==================== WRITING ACCORDION ====================
  document.querySelectorAll('.writing-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var detail = this.querySelector('.writing-item__detail');
      var isOpen = detail.classList.contains('open');

      // Close all
      document.querySelectorAll('.writing-item__detail').forEach(function (d) {
        d.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        detail.classList.add('open');
      }
    });
  });

  // ==================== CONTACT FORM ====================
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('请填写所有字段');
      return;
    }

    // Simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('请输入有效的邮箱地址');
      return;
    }

    // Simulate form submission
    var submitBtn = this.querySelector('.form-submit');
    submitBtn.textContent = '已发送';
    submitBtn.style.background = 'var(--color-black)';
    submitBtn.style.color = 'var(--color-white)';

    setTimeout(function () {
      submitBtn.textContent = '发送';
      submitBtn.style.background = '';
      submitBtn.style.color = '';
      contactForm.reset();
    }, 2000);
  });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);

      if (target) {
        var navHeight = nav.offsetHeight;
        var targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== KEYBOARD SUPPORT ====================
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (bookModal.classList.contains('active')) {
        closeBookModal();
      }
      if (lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    }
  });

})();
