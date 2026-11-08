import { TutorialGuide } from '../types/camera';

export const TUTORIALS_DATA: TutorialGuide[] = [
  {
    id: 'mastering-sony-menus-fn',
    title: 'Mastering the Sony Menu System & Custom Function (Fn) Bar',
    level: 'Essential',
    estimatedMinutes: 8,
    category: 'Sony Menus',
    summary:
      'The modern Sony menu system (introduced with the A7S III & A7 IV) is organized into logical color-coded tabs. Learn how to configure your 12-item Fn menu so you almost never have to dive into deep menus during a shoot.',
    heroTip: 'Assign independent Fn menus for Stills mode and Movie mode so video tools don’t clutter your photography workflow.',
    steps: [
      {
        stepNumber: 1,
        title: 'Understand the Color-Coded Main Tabs',
        summary: 'Red = Shooting, Pink = Exposure/Color, Purple = Focus, Blue = Playback, Yellow = Setup, Green = My Menu.',
        details: [
          'Red (Shooting): Image quality, file format, RAW compression type, drive mode, shutter behavior, and memory card formatting.',
          'Pink (Exposure/Color): ISO, metering modes, flash control, white balance, and Picture Profiles (S-Cinetone, S-Log3).',
          'Purple (Focus): AF area, subject recognition target (Human/Animal/Bird), focus peaking, and focus magnifier.',
          'Yellow (Setup): Display brightness, touch screen settings, battery conservation, and copyright information.',
        ],
        sonyMenuPath: 'Menu > Setup (Yellow) > Dial Customize > Fn Menu Settings',
        proTip: 'Group related functions together in your Fn menu (e.g., AF Area next to Subject Recognition) for muscle memory.',
      },
      {
        stepNumber: 2,
        title: 'Build the Ultimate 12-Slot Photography Fn Menu',
        summary: 'Your most used on-location settings right under your thumb.',
        details: [
          'Top Row (Left to Right): Focus Mode (AF-C / AF-S), Focus Area (Tracking: Spot M), Subject Recog Target, Subject Recog Frame Disp, Face Priority in Multi-metering, White Balance.',
          'Bottom Row (Left to Right): Drive Mode (Single / Continuous Lo/Hi), Silent Shooting (Electronic Shutter), SteadyShot (On/Off), Zebra Display, Peaking Display, Shoot Mode Select.',
        ],
        sonyMenuPath: 'Menu > Setup > Dial/Wheel Settings > Fn Menu Settings (Stills)',
        proTip: 'Keep SteadyShot in the Fn menu so you can quickly disable IBIS when mounting to a rigid tripod.',
      },
      {
        stepNumber: 3,
        title: 'Configure Your "My Menu" (Star Tab) with Critical Deep Options',
        summary: 'Save the 6 deepest commands you need on shoot days.',
        details: [
          'Format Slot 1 & Format Slot 2 (save yourself from drilling through 4 sub-menus).',
          'Anti-dust Function / Shutter When Pw Off (closing the shutter when turning off camera keeps dust off the sensor during lens swaps).',
          'Audio Rec Level (for video shooters).',
          'Pixel Shift Multi Shooting (for landscape/studio shooters).',
        ],
        sonyMenuPath: 'Menu > My Menu (Star) > Add Item',
        proTip: 'Enable "Display from My Menu" so pressing the MENU button jumps straight to your star tab first.',
      },
    ],
  },
  {
    id: 'real-time-eye-af-mastery',
    title: 'Real-Time Eye AF & AI Subject Recognition Masterclass',
    level: 'Beginner',
    estimatedMinutes: 10,
    category: 'Autofocus',
    summary:
      'Sony revolutionized mirrorless photography with AI-powered Real-Time Tracking. Learn how to lock onto human eyes, pets, birds, and fast vehicles with 100% keeper rates.',
    heroTip: 'Always shoot in AF-C (Continuous AF) with Tracking: Spot M for portraits and action. AF-S disables real-time predictive tracking.',
    steps: [
      {
        stepNumber: 1,
        title: 'Set Focus Mode to AF-C (Continuous Autofocus)',
        summary: 'Why AF-S (Single-shot AF) is a beginner trap on modern Sony cameras.',
        details: [
          'In AF-S, the camera locks focus once when you half-press the shutter. If your model breathes or rocks slightly, focus misses at f/1.4.',
          'In AF-C, the camera recalculates focus up to 120 times per second, continuously adjusting as either you or the subject moves.',
          'Ensure "Priority Set in AF-C" is set to "Balanced Emphasis" or "AF Priority" to prevent the shutter firing when focus is out.',
        ],
        sonyMenuPath: 'Menu > Focus (Purple) > AF/MF > Focus Mode > AF-C',
        proTip: 'Pair AF-C with Real-Time Tracking: Spot. Touch or point at your subject, and the green tracking box will stay stuck like glue.',
      },
      {
        stepNumber: 2,
        title: 'Selecting the Subject Recognition Target',
        summary: 'Telling the AI co-processor what anatomical shapes to look for.',
        details: [
          'Human: Locks onto eye pupil. If eye turns away, locks onto head silhouette; if back is turned, locks onto torso.',
          'Animal: Optimized for cats, dogs, wildlife. Locks onto eye, muzzle, or body.',
          'Bird: Specially trained for avian head shapes, beaks, and bird eyes perched or in flight.',
          'Car / Train / Airplane / Insect (on A7R V, A1 II, A6700, A7C II): Locks onto cockpits, headlights, or insect antennae.',
        ],
        sonyMenuPath: 'Menu > Focus > Subject Recognition > Recognition Target',
        proTip: 'Assign "Target Recognition Select" to your C1 custom button to toggle between Human, Animal, and Bird in half a second.',
      },
      {
        stepNumber: 3,
        title: 'Eye Selection & Right/Left Eye Switch',
        summary: 'Choose which eye takes focal priority when shooting profiles or angled portraits.',
        details: [
          'By default, "Right/Left Eye Select" is set to Auto (the camera picks whichever eye is physically closer to the camera lens).',
          'If an artistic composition demands focus on the far eye in shadow, set a custom button to "Switch Right/Left Eye".',
        ],
        sonyMenuPath: 'Menu > Focus > Subject Recognition > Right/Left Eye Select',
        proTip: 'Turn ON "Subject Recog Frame Disp" so you see the reassuring white/green box around the eye in your viewfinder.',
      },
    ],
  },
  {
    id: 'exposure-triangle-sony-mirrorless',
    title: 'The Exposure Triangle & Live Zebras on Sony Viewfinders',
    level: 'Beginner',
    estimatedMinutes: 12,
    category: 'Exposure',
    summary:
      'Unlike old DSLRs, Sony mirrorless viewfinders show WYSIWYG (What You See Is What You Get). Learn to balance Aperture, Shutter Speed, and ISO while using Zebras to guarantee highlight protection.',
    heroTip: 'Set Zebras to 109+ for RAW photography or 95+ for JPEG/Video to see exactly which sky or light source is clipping to pure white.',
    steps: [
      {
        stepNumber: 1,
        title: 'The Mirrorless Advantage: Live Exposure Effect',
        summary: 'How Live View Display shows your final image before you click.',
        details: [
          'In DSLRs, you guessed exposure. On Sony Alpha, your EVF darkens or brightens in real time with every dial turn.',
          'Ensure "Live View Display: Setting Effect ON" is active so you always preview depth of field and exposure brightness.',
          'Exception: When shooting studio strobe flash in a dark room, turn Setting Effect OFF so the viewfinder doesn’t stay black.',
        ],
        sonyMenuPath: 'Menu > Shooting > Shooting Display > Live View Display Set > Setting Effect ON',
        proTip: 'Tap the DISP button on your rear wheel to toggle on the live RGB histogram while shooting.',
      },
      {
        stepNumber: 2,
        title: 'Aperture, Shutter & Auto ISO Minimum Shutter Speed',
        summary: 'Never get blurry photos from handshake again.',
        details: [
          'Aperture (f/1.4 - f/16): Controls depth of field. Use f/1.4 - f/2.8 for blurry backgrounds; f/8 - f/11 for sharp landscapes.',
          'Shutter Speed (1/8000s - 30s): Controls motion freeze. Rule of thumb: minimum 1/(2x focal length) for hand-holding.',
          'Auto ISO Min. SS (Secret Weapon): Tells the camera "do not let shutter speed drop below 1/250s for people" before boosting ISO.',
        ],
        sonyMenuPath: 'Menu > Exposure/Color > Exposure > ISO AUTO Min. SS > 1/250 (or Faster)',
        proTip: 'On Sony A7 IV and newer, set ISO AUTO Min. SS to "Faster" when shooting children or pets to automatically freeze motion.',
      },
      {
        stepNumber: 3,
        title: 'Using Zebra Pattern for Scientific Highlight Protection',
        summary: 'Striped warning lines that appear on your screen before highlights blow out.',
        details: [
          'Zebra stripes are diagnostic diagonal patterns that appear over areas nearing 100% luminance clipping.',
          'For skin tones in portraiture: Set Zebra to Custom 1 with Lower Limit 70 IRE. Adjust exposure until faint zebra stripes kiss forehead/cheekbones.',
          'For landscapes: Set Zebra to Custom 2 with Lower Limit 100+ to ensure skies and clouds don’t lose data.',
        ],
        sonyMenuPath: 'Menu > Exposure/Color > Zebra Display > Zebra Level',
        proTip: 'Sony RAW sensors have immense shadow latitude. It is always safer to protect highlights and lift shadows in post-production.',
      },
    ],
  },
  {
    id: 'scinetone-vs-slog3-video-guide',
    title: 'S-Cinetone vs S-Log3: Getting Cinematic Sony Video Without Headache',
    level: 'Intermediate',
    estimatedMinutes: 11,
    category: 'Video & S-Log',
    summary:
      'Sony’s Picture Profiles are legendary in Hollywood. Understand when to shoot S-Cinetone for instantaneous filmic colors vs S-Log3 for maximum 15-stop dynamic range grading.',
    heroTip: 'Use S-Cinetone (PP11) for fast client turnarounds and natural skin tones. Use S-Log3 (PP8 or PP9) only when you plan to color grade in DaVinci Resolve or Premiere Pro.',
    steps: [
      {
        stepNumber: 1,
        title: 'When to Choose S-Cinetone (Picture Profile 11)',
        summary: 'Derived directly from Sony’s $50,000 VENICE cinema camera.',
        details: [
          'Rich, soft skin tones with gentle highlight roll-off and pleasing contrast straight out of camera.',
          'Zero color grading required: drop clips directly onto your timeline, export, and deliver.',
          'Base ISO is standard (ISO 100 or 125), making it much easier to shoot outdoors in daylight without dense ND filters.',
        ],
        sonyMenuPath: 'Menu > Exposure/Color > Color/Tone > Picture Profile > PP11 (S-Cinetone)',
        proTip: 'Expose S-Cinetone normally using your middle-gray metering or histogram. Do not overexpose.',
      },
      {
        stepNumber: 2,
        title: 'When to Choose S-Log3 with S-Gamut3.Cine',
        summary: 'Preserving all 15 stops of dynamic range for professional post-production.',
        details: [
          'Appears flat, washed-out, and desaturated on the sensor to preserve maximum highlight and shadow detail.',
          'Requires 10-bit 4:2:2 recording (available on A7 IV, A7R V, A7C II, FX3, A6700). Never shoot S-Log in 8-bit on older bodies!',
          'Dual Base ISO: On cameras like FX3/A7S III, shoot at ISO 800 or ISO 12,800. On A7 IV, base is ISO 800 and second tier is ISO 3200.',
        ],
        sonyMenuPath: 'Menu > Exposure/Color > Color/Tone > Picture Profile > PP8 (S-Log3/S-Gamut3.Cine)',
        proTip: 'Turn on "Gamma Display Assist (s709)" so your screen converts the log image into a clean natural preview while recording.',
      },
      {
        stepNumber: 3,
        title: 'The Golden Rule of S-Log3 Exposure: +1.0 to +1.7 EV',
        summary: 'Protecting the shadows from digital chroma noise.',
        details: [
          'Unlike stills where you underexpose to save skies, S-Log3 performs best when exposed to the right (ETTR).',
          'Keep your Multi-Metered MM indicator reading between +1.3 EV and +1.7 EV for clean, velvety, noise-free shadows once converted.',
        ],
        sonyMenuPath: 'Monitor your Viewfinder bottom readout: MM +1.3 to +1.7',
        proTip: 'Apply Sony’s official s709 LUT or Phantom LUTs in DaVinci Resolve for instant cinematic transformation.',
      },
    ],
  },
  {
    id: 'lossless-compressed-raw-workflow',
    title: 'Sony ARW RAW Formats & Dynamic Range Recovery in Lightroom',
    level: 'Essential',
    estimatedMinutes: 7,
    category: 'RAW Workflow',
    summary:
      'Understanding the difference between Uncompressed, Lossless Compressed (S/M/L), and Compressed RAW on Sony Alpha bodies.',
    heroTip: 'Always choose Lossless Compressed RAW (L). You get 100% of the dynamic range of Uncompressed RAW with 40% smaller file sizes!',
    steps: [
      {
        stepNumber: 1,
        title: 'Choosing the Right RAW Compression Type',
        summary: 'Save hundreds of gigabytes of hard drive space without compromising image quality.',
        details: [
          'Uncompressed RAW: Massive files (approx. 70MB - 120MB per photo). Unnecessary for 99% of shoots.',
          'Lossless Compressed (L): Bit-for-bit mathematically identical image quality to uncompressed, but compressed like a ZIP archive. Approximately 35MB - 60MB.',
          'Lossless Compressed (M/S): Downsampled in-camera (e.g. 26MP on A7R V). Great for events where 61MP is unnecessary.',
          'Compressed (Lossy): Smallest, but can occasionally produce slight artifacting in extreme high-contrast star halos or silhouetted branches.',
        ],
        sonyMenuPath: 'Menu > Shooting > Image Quality > File Format > RAW & JPEG / HEIF > RAW File Type > Lossless Comp (L)',
        proTip: 'On the Sony A7 IV, shooting Lossless Compressed RAW drops burst speed to 6 fps. If you need 10 fps for sports, switch to Compressed RAW.',
      },
      {
        stepNumber: 2,
        title: 'Lifting Sony Shadows in Adobe Lightroom or Capture One',
        summary: 'Tapping into Sony’s legendary class-leading sensor dynamic range.',
        details: [
          'Sony BSI Exmor R sensors have nearly zero read noise (ISO invariance).',
          'In Lightroom, you can comfortably raise Shadows slider +50 to +80 without introducing color speckling or banding.',
          'Under Camera Matching Profiles, select "Camera ST" (Standard) or "Camera NT" (Neutral) rather than Adobe Standard for accurate Sony skin tones.',
        ],
        sonyMenuPath: 'Adobe Lightroom > Develop Module > Profile > Camera Matching',
        proTip: 'Avoid using generic sharpening. Set Masking slider to 60+ in Lightroom (hold Option/Alt while dragging) so sharpening only touches edges, not smooth skies.',
      },
    ],
  },
];
