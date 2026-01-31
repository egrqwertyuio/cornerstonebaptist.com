// ===== Daily Verse Feature =====

// Curated verses for daily rotation - Using King James Version
const dailyVerses = [
  {
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    reference: "John 3:16"
  },
  {
    text: "I can do all things through Christ which strengtheneth me.",
    reference: "Philippians 4:13"
  },
  {
    text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    reference: "Proverbs 3:5-6"
  },
  {
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
    reference: "Ephesians 2:8-9"
  },
  {
    text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
    reference: "Psalm 23:1-2"
  },
  {
    text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    reference: "Isaiah 41:10"
  },
  {
    text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    reference: "Romans 8:28"
  },
  {
    text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    reference: "Joshua 1:9"
  },
  {
    text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    reference: "Matthew 6:33"
  },
  {
    text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    reference: "Jeremiah 29:11"
  },
  {
    text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    reference: "1 John 1:9"
  },
  {
    text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    reference: "Philippians 4:6"
  },
  {
    text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
    reference: "Psalm 34:18"
  },
  {
    text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.",
    reference: "Romans 6:23"
  },
  {
    text: "These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.",
    reference: "John 16:33"
  },
  {
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    reference: "Hebrews 11:1"
  },
  {
    text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    reference: "Isaiah 40:31"
  },
  {
    text: "Thy word is a lamp unto my feet, and a light unto my path.",
    reference: "Psalm 119:105"
  },
  {
    text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
    reference: "Romans 10:9"
  },
  {
    text: "Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee.",
    reference: "Hebrews 13:5"
  },
  {
    text: "For where two or three are gathered together in my name, there am I in the midst of them.",
    reference: "Matthew 18:20"
  },
  {
    text: "Blessed are the pure in heart: for they shall see God.",
    reference: "Matthew 5:8"
  },
  {
    text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    reference: "Matthew 11:28"
  },
  {
    text: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.",
    reference: "Proverbs 18:10"
  },
  {
    text: "Jesus said unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
    reference: "John 14:6"
  },
  {
    text: "Casting all your care upon him; for he careth for you.",
    reference: "1 Peter 5:7"
  },
  {
    text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.",
    reference: "Galatians 5:22-23"
  },
  {
    text: "Draw nigh to God, and he will draw nigh to you.",
    reference: "James 4:8a"
  },
  {
    text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    reference: "2 Timothy 1:7"
  },
  {
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    reference: "John 1:1"
  }
];

// Get verse based on day of year to ensure daily rotation
function getDailyVerse() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Use modulo to cycle through verses
  const index = dayOfYear % dailyVerses.length;
  return dailyVerses[index];
}

// Display daily verse
function displayDailyVerse() {
  const verseTextEl = document.getElementById('verseText');
  const verseRefEl = document.getElementById('verseRef');

  if (!verseTextEl || !verseRefEl) return;

  const verse = getDailyVerse();

  // Fade in effect
  verseTextEl.style.opacity = '0';
  verseRefEl.style.opacity = '0';

  setTimeout(() => {
    verseTextEl.textContent = `"${verse.text}"`;
    verseRefEl.textContent = verse.reference + ' (KJV)';

    verseTextEl.style.transition = 'opacity 0.5s ease';
    verseRefEl.style.transition = 'opacity 0.5s ease';
    verseTextEl.style.opacity = '1';
    verseRefEl.style.opacity = '1';
  }, 100);
}

// Share verse functionality
function setupShareButton() {
  const shareBtn = document.getElementById('shareVerse');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    const verse = getDailyVerse();
    const shareText = `"${verse.text}" - ${verse.reference} (KJV)`;

    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Daily Verse from Cornerstone Baptist Church',
        text: shareText,
        url: window.location.href
      }).catch(err => console.log('Share cancelled'));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        // Change button text temporarily
        const originalHTML = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied to Clipboard!';
        shareBtn.style.background = '#28a745';

        setTimeout(() => {
          shareBtn.innerHTML = originalHTML;
          shareBtn.style.background = '';
        }, 2000);
      }).catch(err => {
        alert('Failed to copy verse. Please try again.');
      });
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  displayDailyVerse();
  setupShareButton();
});

// ===== Scripture Reference Links =====
// Make reference links interactive
document.addEventListener('DOMContentLoaded', () => {
  const refLinks = document.querySelectorAll('.ref-link');

  refLinks.forEach(link => {
    link.style.cursor = 'pointer';
    link.addEventListener('click', function() {
      const verse = this.getAttribute('data-verse');
      if (verse) {
        // Convert verse reference to URL format
        // Example: "John 3:16" -> "John-3-16"
        const urlVerse = verse.replace(/\s+/g, '-').replace(/:/g, '-');
        const kjvUrl = `https://www.kingjamesbibleonline.org/${urlVerse}/`;
        window.open(kjvUrl, '_blank', 'noopener');
      }
    });

    // Add hover effect
    link.addEventListener('mouseenter', function() {
      this.style.color = 'var(--accent)';
      this.style.textDecoration = 'underline';
    });

    link.addEventListener('mouseleave', function() {
      this.style.color = '';
      this.style.textDecoration = '';
    });
  });
});

console.log('%c📖 Daily Devotions Loaded', 'color: #00558c; font-size: 14px; font-weight: bold;');
console.log('%cVerse of the day:', 'color: #f2b428; font-size: 12px;');
const todaysVerse = getDailyVerse();
console.log(`%c"${todaysVerse.text}" - ${todaysVerse.reference}`, 'color: #6c757d; font-size: 11px; font-style: italic;');
