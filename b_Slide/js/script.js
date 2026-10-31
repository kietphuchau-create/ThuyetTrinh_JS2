document.addEventListener('DOMContentLoaded', () => {
      const snapContainer = document.getElementById('snapContainer');
      const slides = Array.from(document.querySelectorAll('.slide-section'));
      const sideNavItems = Array.from(document.querySelectorAll('.side-number-item'));
      const prevSlideBtn = document.getElementById('prevSlideBtn');
      const nextSlideBtn = document.getElementById('nextSlideBtn');
      const fullScreenBtn = document.getElementById('fullScreenBtn');
      const slideIndicatorLabel = document.getElementById('slideIndicatorLabel');
      const scrollProgressBar = document.getElementById('scrollProgressBar');
      const totalSlides = slides.length;
      let currentSlideIndex = 0;

      // 1. Chuyển Slide (Trên desktop khung trắng cố định, không cuộn dọc cả trang)
      function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentSlideIndex = index;
        if (window.innerWidth <= 992) {
          slides[currentSlideIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        updateUI();
      }

      // 2. Cập nhật UI (thanh tiến độ, nút active, indicator)
      function updateUI() {
        slides.forEach((slide, i) => {
          if (i === currentSlideIndex) {
            slide.classList.remove('active');
            void slide.offsetWidth; // Force reflow to re-trigger smooth entrance animations
            slide.classList.add('active');
            if (i === 0) {
              const videos = slide.querySelectorAll('video');
              videos.forEach(v => {
                if (v.paused) v.play().catch(() => {});
              });
            }
          } else {
            slide.classList.remove('active');
          }
        });

        sideNavItems.forEach((item, i) => {
          if (i === currentSlideIndex) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        if (slideIndicatorLabel) {
          const currentFormatted = String(currentSlideIndex + 1).padStart(2, '0');
          const totalFormatted = String(totalSlides).padStart(2, '0');
          slideIndicatorLabel.textContent = `${currentFormatted} / ${totalFormatted}`;
        }

        if (scrollProgressBar) {
          const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
          scrollProgressBar.style.width = `${progressPercent}%`;
        }
      }

      // 3. Intersection Observer (chỉ áp dụng trên mobile khi người dùng lướt feed)
      if (window.innerWidth <= 992) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = slides.indexOf(entry.target);
              if (index !== -1 && index !== currentSlideIndex) {
                currentSlideIndex = index;
                updateUI();
              }
            }
          });
        }, { root: null, threshold: 0.25 });

        slides.forEach(slide => observer.observe(slide));
      }

      // 3b. Chuột lăn (Mouse Wheel) chuyển slide mượt mà trên desktop - Khung trắng giữ nguyên tuyệt đối
      let isWheelThrottled = false;
      window.addEventListener('wheel', (e) => {
        if (window.innerWidth <= 992) return;
        if (isWheelThrottled) return;
        if (Math.abs(e.deltaY) < 22) return;

        // Nếu nội dung slide dài và người dùng đang cuộn thanh cuộn bên trong card
        const currentBox = slides[currentSlideIndex].querySelector('.content-box');
        if (currentBox && currentBox.scrollHeight > currentBox.clientHeight) {
          const atTop = currentBox.scrollTop <= 2;
          const atBottom = currentBox.scrollTop + currentBox.clientHeight >= currentBox.scrollHeight - 4;
          if (e.deltaY < 0 && !atTop) return;
          if (e.deltaY > 0 && !atBottom) return;
        }

        isWheelThrottled = true;
        if (e.deltaY > 0) {
          goToSlide(currentSlideIndex + 1);
        } else {
          goToSlide(currentSlideIndex - 1);
        }
        setTimeout(() => {
          isWheelThrottled = false;
        }, 360);
      }, { passive: true });

      // 4. Click Side Nav
      sideNavItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const targetIndex = parseInt(item.getAttribute('data-index'), 10);
          goToSlide(targetIndex);
        });
      });

      // 5. Nút Prev / Next
      if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
      if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
      if (fullScreenBtn) fullScreenBtn.addEventListener('click', toggleFullScreen);

      // 6. Phím tắt trình chiếu (Keyboard Shortcuts)
      document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowRight':
          case 'PageDown':
          case ' ':
            e.preventDefault();
            goToSlide(currentSlideIndex + 1);
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
          case 'PageUp':
            e.preventDefault();
            goToSlide(currentSlideIndex - 1);
            break;
          case 'Home':
            e.preventDefault();
            
      // =========================================================
      // INTERACTIVE PAN & ZOOM LIGHTBOX FOR DIAGRAM IMAGES
      // =========================================================
      const lightboxModal = document.getElementById('imageLightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxTitle = document.getElementById('lightboxTitle');
      const lightboxViewport = document.getElementById('lightboxViewport');
      const lightboxZoomIn = document.getElementById('lightboxZoomIn');
      const lightboxZoomOut = document.getElementById('lightboxZoomOut');
      const lightboxReset = document.getElementById('lightboxReset');
      const lightboxClose = document.getElementById('lightboxClose');

      let currentScale = 1;
      let posX = 0;
      let posY = 0;
      let isDragging = false;
      let startMouseX = 0;
      let startMouseY = 0;
      let isLightboxOpen = false;

      function updateImgTransform() {
        if (!lightboxImg) return;
        lightboxImg.style.transform = `translate(${posX}px, ${posY}px) scale(${currentScale})`;
      }

      function resetZoomAndPan() {
        currentScale = 1;
        posX = 0;
        posY = 0;
        updateImgTransform();
      }

      function openLightbox(src, title) {
        if (!lightboxModal || !lightboxImg) return;
        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title || 'Sơ đồ kỹ thuật MedSched Pro';
        resetZoomAndPan();
        lightboxModal.classList.add('is-active');
        isLightboxOpen = true;
      }

      function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('is-active');
        isLightboxOpen = false;
      }

      // Gắn sự kiện click mở Lightbox cho tất cả các hình sơ đồ
      document.querySelectorAll('.diagram-img, .diagram-img-frame').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const img = el.classList.contains('diagram-img') ? el : el.querySelector('img');
          if (img && img.src) {
            const slideSection = el.closest('.slide-section');
            const slideTitle = slideSection ? (slideSection.querySelector('h2')?.textContent || '') : '';
            openLightbox(img.src, slideTitle);
          }
        });
      });

      // Zoom In / Zoom Out / Reset Buttons
      if (lightboxZoomIn) {
        lightboxZoomIn.addEventListener('click', (e) => {
          e.stopPropagation();
          currentScale = Math.min(currentScale + 0.3, 4.5);
          updateImgTransform();
        });
      }

      if (lightboxZoomOut) {
        lightboxZoomOut.addEventListener('click', (e) => {
          e.stopPropagation();
          currentScale = Math.max(currentScale - 0.3, 0.5);
          updateImgTransform();
        });
      }

      if (lightboxReset) {
        lightboxReset.addEventListener('click', (e) => {
          e.stopPropagation();
          resetZoomAndPan();
        });
      }

      if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
          e.stopPropagation();
          closeLightbox();
        });
      }

      // Drag / Pan logic
      if (lightboxViewport) {
        lightboxViewport.addEventListener('mousedown', (e) => {
          if (!isLightboxOpen) return;
          if (e.target.closest('.lightbox-toolbar') || e.target.closest('.lightbox-hint')) return;
          isDragging = true;
          startMouseX = e.clientX - posX;
          startMouseY = e.clientY - posY;
          lightboxViewport.classList.add('is-dragging');
          e.preventDefault();
        });

        // Double click để toggle zoom 1x <-> 2x
        lightboxViewport.addEventListener('dblclick', (e) => {
          if (!isLightboxOpen) return;
          if (e.target.closest('.lightbox-toolbar')) return;
          if (currentScale > 1.2) {
            resetZoomAndPan();
          } else {
            currentScale = 2;
            updateImgTransform();
          }
        });
      }

      window.addEventListener('mousemove', (e) => {
        if (!isDragging || !isLightboxOpen) return;
        posX = e.clientX - startMouseX;
        posY = e.clientY - startMouseY;
        updateImgTransform();
      });

      window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        if (lightboxViewport) lightboxViewport.classList.remove('is-dragging');
      });

      // Mouse Wheel to Zoom inside Lightbox (Ngăn cuộn slide khi đang mở Lightbox)
      window.addEventListener('wheel', (e) => {
        if (!isLightboxOpen) return;
        e.preventDefault();
        e.stopPropagation();
        const zoomDelta = e.deltaY < 0 ? 0.2 : -0.2;
        currentScale = Math.min(Math.max(currentScale + zoomDelta, 0.5), 4.5);
        updateImgTransform();
      }, { passive: false });

      // Phím Esc đóng Lightbox
      document.addEventListener('keydown', (e) => {
        if (isLightboxOpen && (e.key === 'Escape' || e.key === 'Esc')) {
          e.preventDefault();
          closeLightbox();
        }
      });

      goToSlide(0);
            break;
          case 'End':
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
          case 'f':
          case 'F':
            e.preventDefault();
            toggleFullScreen();
            break;
        }
      });

      // 7. Fullscreen Toggle (Phím F)
      function toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      }

      // 8. Accordion Q&A
      document.querySelectorAll('.qna-header-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.qna-accordion-item');
          item.classList.toggle('open');
        });
      });

      // 9. Tự động trôi ra / ẩn thanh số slide khi rê chuột gần mép trái màn hình
      const sideNavEl = document.getElementById('sideNav');
      if (sideNavEl) {
        document.addEventListener('mousemove', (e) => {
          if (e.clientX <= 48) {
            sideNavEl.classList.add('is-hovered');
          } else if (e.clientX > 120) {
            sideNavEl.classList.remove('is-hovered');
          }
        });
      }

      // Khởi tạo
      
      // =========================================================
      // INTERACTIVE PAN & ZOOM LIGHTBOX FOR DIAGRAM IMAGES
      // =========================================================
      const lightboxModal = document.getElementById('imageLightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxTitle = document.getElementById('lightboxTitle');
      const lightboxViewport = document.getElementById('lightboxViewport');
      const lightboxZoomIn = document.getElementById('lightboxZoomIn');
      const lightboxZoomOut = document.getElementById('lightboxZoomOut');
      const lightboxReset = document.getElementById('lightboxReset');
      const lightboxClose = document.getElementById('lightboxClose');

      let currentScale = 1;
      let posX = 0;
      let posY = 0;
      let isDragging = false;
      let startMouseX = 0;
      let startMouseY = 0;
      let isLightboxOpen = false;

      function updateImgTransform() {
        if (!lightboxImg) return;
        lightboxImg.style.transform = `translate(${posX}px, ${posY}px) scale(${currentScale})`;
      }

      function resetZoomAndPan() {
        currentScale = 1;
        posX = 0;
        posY = 0;
        updateImgTransform();
      }

      function openLightbox(src, title) {
        if (!lightboxModal || !lightboxImg) return;
        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title || 'Sơ đồ kỹ thuật MedSched Pro';
        resetZoomAndPan();
        lightboxModal.classList.add('is-active');
        isLightboxOpen = true;
      }

      function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('is-active');
        isLightboxOpen = false;
      }

      // Gắn sự kiện click mở Lightbox cho tất cả các hình sơ đồ
      document.querySelectorAll('.diagram-img, .diagram-img-frame').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const img = el.classList.contains('diagram-img') ? el : el.querySelector('img');
          if (img && img.src) {
            const slideSection = el.closest('.slide-section');
            const slideTitle = slideSection ? (slideSection.querySelector('h2')?.textContent || '') : '';
            openLightbox(img.src, slideTitle);
          }
        });
      });

      // Zoom In / Zoom Out / Reset Buttons
      if (lightboxZoomIn) {
        lightboxZoomIn.addEventListener('click', (e) => {
          e.stopPropagation();
          currentScale = Math.min(currentScale + 0.3, 4.5);
          updateImgTransform();
        });
      }

      if (lightboxZoomOut) {
        lightboxZoomOut.addEventListener('click', (e) => {
          e.stopPropagation();
          currentScale = Math.max(currentScale - 0.3, 0.5);
          updateImgTransform();
        });
      }

      if (lightboxReset) {
        lightboxReset.addEventListener('click', (e) => {
          e.stopPropagation();
          resetZoomAndPan();
        });
      }

      if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
          e.stopPropagation();
          closeLightbox();
        });
      }

      // Drag / Pan logic
      if (lightboxViewport) {
        lightboxViewport.addEventListener('mousedown', (e) => {
          if (!isLightboxOpen) return;
          if (e.target.closest('.lightbox-toolbar') || e.target.closest('.lightbox-hint')) return;
          isDragging = true;
          startMouseX = e.clientX - posX;
          startMouseY = e.clientY - posY;
          lightboxViewport.classList.add('is-dragging');
          e.preventDefault();
        });

        // Double click để toggle zoom 1x <-> 2x
        lightboxViewport.addEventListener('dblclick', (e) => {
          if (!isLightboxOpen) return;
          if (e.target.closest('.lightbox-toolbar')) return;
          if (currentScale > 1.2) {
            resetZoomAndPan();
          } else {
            currentScale = 2;
            updateImgTransform();
          }
        });
      }

      window.addEventListener('mousemove', (e) => {
        if (!isDragging || !isLightboxOpen) return;
        posX = e.clientX - startMouseX;
        posY = e.clientY - startMouseY;
        updateImgTransform();
      });

      window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        if (lightboxViewport) lightboxViewport.classList.remove('is-dragging');
      });

      // Mouse Wheel to Zoom inside Lightbox (Ngăn cuộn slide khi đang mở Lightbox)
      window.addEventListener('wheel', (e) => {
        if (!isLightboxOpen) return;
        e.preventDefault();
        e.stopPropagation();
        const zoomDelta = e.deltaY < 0 ? 0.2 : -0.2;
        currentScale = Math.min(Math.max(currentScale + zoomDelta, 0.5), 4.5);
        updateImgTransform();
      }, { passive: false });

      // Phím Esc đóng Lightbox
      document.addEventListener('keydown', (e) => {
        if (isLightboxOpen && (e.key === 'Escape' || e.key === 'Esc')) {
          e.preventDefault();
          closeLightbox();
        }
      });

      goToSlide(0);
    });
