// Deep Linking & Share Utilities for Typing Club 685 Lessons

export function getLessonFromUrl(lessonsList) {
  try {
    const url = new URL(window.location.href);
    let param = url.searchParams.get('lesson') || url.searchParams.get('l');
    
    // Also support hash fragments like #lesson-183 or #/lesson/183 or #183
    if (!param && window.location.hash) {
      const match = window.location.hash.match(/(?:lesson[=-]|\/lesson\/|^#)(\d+)/i);
      if (match) param = match[1];
    }

    if (param) {
      const num = parseInt(param, 10);
      if (!isNaN(num) && num >= 1 && num <= 685) {
        const found = lessonsList.find((l) => l.number === num);
        if (found) return found;
      }
    }
  } catch {}
  return null;
}

export function getShareUrl(lessonNumber) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('lesson', String(lessonNumber));
    url.searchParams.delete('view');
    // Clear hash if it was a lesson hash
    if (url.hash && /lesson|\d+/i.test(url.hash)) {
      url.hash = '';
    }
    return url.toString();
  } catch {
    return `${window.location.origin}${window.location.pathname}?lesson=${lessonNumber}`;
  }
}

export async function shareLesson({ lessonNumber, lessonTitle, wpm, accuracy, onToast }) {
  const url = getShareUrl(lessonNumber);
  const title = `Lesson ${lessonNumber}: ${lessonTitle || 'Typing Drill'} | Typing Club`;
  
  let shareText = `Practice Lesson ${lessonNumber} (${lessonTitle || 'Typing Drill'}) on Room 518 Typing Club!`;
  if (wpm !== undefined && accuracy !== undefined) {
    shareText = `🏆 I typed Lesson ${lessonNumber} at ${wpm} WPM with ${accuracy}% accuracy on Typing Club! Can you beat my score?`;
  }

  // Attempt Web Share API first on supported mobile devices
  if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
    try {
      await navigator.share({
        title,
        text: shareText,
        url
      });
      if (onToast) {
        onToast({
          title: 'Shared Successfully!',
          message: `Lesson ${lessonNumber} link shared`,
          url,
          type: 'success'
        });
      }
      return { success: true, method: 'share_api', url };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, method: 'cancelled', url };
      }
    }
  }

  // Fallback to Clipboard Copy
  let copied = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      copied = true;
    }
  } catch {}

  if (!copied) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {}
  }

  if (copied) {
    if (onToast) {
      onToast({
        title: `Lesson ${lessonNumber} Link Copied!`,
        message: url,
        url,
        type: 'success'
      });
    }
    return { success: true, method: 'clipboard', url };
  } else {
    // If copying failed completely, prompt
    window.prompt('Copy this lesson link:', url);
    return { success: true, method: 'prompt', url };
  }
}
