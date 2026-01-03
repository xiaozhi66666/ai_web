// 显示当前时间
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `当前时间：${timeString}`;
    }
}

// 更新时间显示
function initTimeDisplay() {
    // 检查时间显示元素是否已经存在
    let timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        return; // 如果已经存在，直接返回
    }

    // 创建时间显示元素
    timeDisplay = document.createElement('div');
    timeDisplay.id = 'current-time';
    timeDisplay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        font-family: 'Arial', 'Microsoft YaHei', sans-serif;
        font-size: 16px;
        font-weight: bold;
        color: #2c3e50;
        z-index: 99999;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 107, 107, 0.3);
        transition: all 0.3s ease;
        cursor: pointer;
    `;

    document.body.appendChild(timeDisplay);

    // 初始更新时间
    updateTime();

    // 每秒更新一次时间
    setInterval(updateTime, 1000);

    // 添加点击事件，可以手动更新时间
    timeDisplay.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        updateTime();
    });

    // 添加鼠标悬停效果
    timeDisplay.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
        this.style.borderColor = 'rgba(255, 107, 107, 0.6)';
    });

    timeDisplay.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        this.style.borderColor = 'rgba(255, 107, 107, 0.3)';
    });
}
// 平滑滚动效果
function initSmoothScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 为每个时间线项目添加动画样式
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// 添加键盘快捷键支持
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // 按空格键回到顶部
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // 按 Home 键回到顶部
        if (e.code === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // 按 End 键到底部
        if (e.code === 'End') {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

// 添加滚动进度条
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(to right, #ff6b6b, #4ecdc4, #45b7d1);
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 添加鼠标跟随效果
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 107, 107, 0.3), rgba(78, 205, 196, 0.3));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease;
        mix-blend-mode: multiply;
    `;

    document.body.appendChild(follower);

    document.addEventListener('mousemove', function(e) {
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
    });

    // 隐藏跟随效果（移动设备）
    if ('ontouchstart' in window) {
        follower.style.display = 'none';
    }
}

// 添加点击波纹效果
function initRippleEffect() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: relative;
            overflow: hidden;
        }
        
        .ripple::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .ripple:active::before {
            width: 300px;
            height: 300px;
        }
    `;
    document.head.appendChild(style);

    // 为按钮添加波纹效果
    const buttons = document.querySelectorAll('.timeline-content, .media-item');
    buttons.forEach(button => {
        button.classList.add('ripple');
    });
}

// 初始化所有功能
function initAllFeatures() {
    initTimeDisplay();
    initSmoothScroll();
    initKeyboardShortcuts();
    initScrollProgress();
    initMouseFollower();
    initRippleEffect();
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', initAllFeatures);