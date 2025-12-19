import { Curriculum, GradeLevel } from './types';

export const CURRICULUM_DATA: Record<string, Curriculum> = {
  grade1: {
    grade: GradeLevel.Grade1,
    themes: [
      // --- TERM 1 ---
      {
        id: 'g1_t1',
        title: { ar: 'المحور الأول: من أكون؟', en: 'Theme 1: Who Am I?' },
        term: 1,
        chapters: [
          {
            id: 'g1_t1_ch1',
            title: { ar: 'الفصل الأول: اعرفني', en: 'Chapter 1: All About Me' },
            lessons: [
              { id: 'g1_t1_ch1_l1', title: { ar: 'الدرس 1: صورتي الذاتية', en: 'Lesson 1: Self-Portrait' }, description: { ar: 'رسم صورة لنفسي والتعرف على ملامحي.', en: 'Drawing a picture of myself.' } },
              { id: 'g1_t1_ch1_l2', title: { ar: 'الدرس 2: عائلتي', en: 'Lesson 2: My Family' }, description: { ar: 'التعرف على أفراد العائلة.', en: 'Identify family members.' } },
              { id: 'g1_t1_ch1_l3', title: { ar: 'الدرس 3: حواسي الخمس', en: 'Lesson 3: My Five Senses' }, description: { ar: 'استخدام الحواس لاكتشاف العالم.', en: 'Using senses to discover the world.' } },
              { id: 'g1_t1_ch1_l4', title: { ar: 'الدرس 4: التشابه والاختلاف', en: 'Lesson 4: Similarities and Differences' }, description: { ar: 'كيف نتشابه وكيف نختلف؟', en: 'How are we alike and different?' } }
            ]
          },
          {
            id: 'g1_t1_ch2',
            title: { ar: 'الفصل الثاني: شجرة العائلة', en: 'Chapter 2: Family Tree' },
            lessons: [
              { id: 'g1_t1_ch2_l1', title: { ar: 'الدرس 1: الروتين اليومي', en: 'Lesson 1: Daily Routine' }, description: { ar: 'ترتيب الأحداث اليومية.', en: 'Ordering daily events.' } },
              { id: 'g1_t1_ch2_l2', title: { ar: 'الدرس 2: الصغار والكبار', en: 'Lesson 2: Adults and Babies' }, description: { ar: 'المقارنة بين الصغار والكبار.', en: 'Comparing babies and adults.' } },
              { id: 'g1_t1_ch2_l3', title: { ar: 'الدرس 3: دورة الحياة', en: 'Lesson 3: Life Cycles' }, description: { ar: 'مراحل نمو الإنسان والنبات.', en: 'Growth stages of humans and plants.' } }
            ]
          },
          {
            id: 'g1_t1_ch3',
            title: { ar: 'الفصل الثالث: مجتمعنا', en: 'Chapter 3: Our Community' },
            lessons: [
              { id: 'g1_t1_ch3_l1', title: { ar: 'الدرس 1: حقوقنا', en: 'Lesson 1: Our Rights' }, description: { ar: 'التعلم والأمان والمشاركة.', en: 'Learning, safety, and sharing.' } },
              { id: 'g1_t1_ch3_l2', title: { ar: 'الدرس 2: المهن والأدوات', en: 'Lesson 2: Jobs and Tools' }, description: { ar: 'من يساعدنا في المجتمع وماذا يستخدمون؟', en: 'Who helps us and what tools do they use?' } }
            ]
          }
        ]
      },
      {
        id: 'g1_t2',
        title: { ar: 'المحور الثاني: العالم من حولي', en: 'Theme 2: The World Around Me' },
        term: 1,
        chapters: [
          {
            id: 'g1_t2_ch1',
            title: { ar: 'الفصل الأول: بيئتنا', en: 'Chapter 1: Our Environment' },
            lessons: [
              { id: 'g1_t2_ch1_l1', title: { ar: 'الدرس 1: الكائنات الحية', en: 'Lesson 1: Living Things' }, description: { ar: 'ما الذي يحتاج للغذاء والماء؟', en: 'What needs food and water?' } },
              { id: 'g1_t2_ch1_l2', title: { ar: 'الدرس 2: الصحراء والدلتا', en: 'Lesson 2: Desert and Delta' }, description: { ar: 'البيئات المختلفة في مصر.', en: 'Different environments in Egypt.' } },
              { id: 'g1_t2_ch1_l3', title: { ar: 'الدرس 3: الحفاظ على البيئة', en: 'Lesson 3: Taking Care of Environment' }, description: { ar: 'كيف نحافظ على نظافة بيئتنا؟', en: 'How to keep our environment clean?' } }
            ]
          },
          {
            id: 'g1_t2_ch2',
            title: { ar: 'الفصل الثاني: التجول في البيئة', en: 'Chapter 2: Moving Around Our Environment' },
            lessons: [
              { id: 'g1_t2_ch2_l1', title: { ar: 'الدرس 1: النباتات والحيوانات', en: 'Lesson 1: Plants and Animals' }, description: { ar: 'أجزاء النبات وحركة الحيوانات.', en: 'Plant parts and animal movement.' } },
              { id: 'g1_t2_ch2_l2', title: { ar: 'الدرس 2: حركة الأشياء', en: 'Lesson 2: How Objects Move' }, description: { ar: 'الدفع والسحب والتدحرج.', en: 'Push, pull, roll.' } },
              { id: 'g1_t2_ch2_l3', title: { ar: 'الدرس 3: وسائل المواصلات', en: 'Lesson 3: Transportation' }, description: { ar: 'كيف ننتقل من مكان لآخر؟', en: 'How do we travel?' } }
            ]
          },
          {
            id: 'g1_t2_ch3',
            title: { ar: 'الفصل الثالث: زراعة الغذاء في العالم من حولنا', en: 'Chapter 3: Growing Food In The World Around Us' },
            lessons: [
              { id: 'g1_t2_ch3_l1', title: { ar: 'الدرس 1: الشمس والسماء', en: 'Lesson 1: Sun and Sky' }, description: { ar: 'تأثير الشمس على حياتنا.', en: 'Sun\'s effect on our lives.' } },
              { id: 'g1_t2_ch3_l2', title: { ar: 'الدرس 2: فصول السنة', en: 'Lesson 2: Seasons' }, description: { ar: 'التغيرات في الطقس والنباتات.', en: 'Changes in weather and plants.' } },
              { id: 'g1_t2_ch3_l3', title: { ar: 'الدرس 3: خيارات الطعام الصحي', en: 'Lesson 3: Healthy Food Choices' }, description: { ar: 'ماذا نأكل لنكون أصحاء؟', en: 'What to eat to be healthy?' } }
            ]
          },
          {
            id: 'g1_t2_ch4',
            title: { ar: 'الفصل الرابع: الاحتفال بالعالم من حولنا', en: 'Chapter 4: Celebrating The World Around Us' },
            lessons: [
              { id: 'g1_t2_ch4_l1', title: { ar: 'الدرس 1: الأعياد المصرية', en: 'Lesson 1: Egyptian Feasts' }, description: { ar: 'عيد الفطر، عيد الأضحى، وشم النسيم.', en: 'Eid and other celebrations.' } },
              { id: 'g1_t2_ch4_l2', title: { ar: 'الدرس 2: التقاليد المصرية', en: 'Lesson 2: Egyptian Traditions' }, description: { ar: 'الطعام والملابس والموسيقى.', en: 'Food, clothing, and music.' } },
              { id: 'g1_t2_ch4_l3', title: { ar: 'الدرس 3: الآثار المصرية', en: 'Lesson 3: Egyptian Monuments' }, description: { ar: 'الأهرامات والمعابد.', en: 'Pyramids and temples.' } }
            ]
          }
        ]
      },
      // --- TERM 2 ---
      {
        id: 'g1_t3',
        title: { ar: 'المحور الثالث: كيف يعمل العالم؟', en: 'Theme 3: How The World Works?' },
        term: 2,
        chapters: [
          {
            id: 'g1_t3_ch1',
            title: { ar: 'الفصل الأول: كيف يتم تصنيع المنتجات حول العالم', en: 'Chapter 1: How Goods Are Made Around the World' },
            lessons: [
              { id: 'g1_t3_ch1_l1', title: { ar: 'الدرس 1: الحاجات والرغبات', en: 'Lesson 1: Needs and Wants' }, description: { ar: 'ماذا نحتاج فعلاً؟', en: 'What do we really need?' } },
              { id: 'g1_t3_ch1_l2', title: { ar: 'الدرس 2: الموارد وتصنيع الملابس', en: 'Lesson 2: Resources and Clothing' }, description: { ar: 'من القطن إلى القميص.', en: 'From cotton to t-shirt.' } },
              { id: 'g1_t3_ch1_l3', title: { ar: 'الدرس 3: التكنولوجيا', en: 'Lesson 3: Technology' }, description: { ar: 'الأدوات التي تساعدنا.', en: 'Tools that help us.' } }
            ]
          },
          {
            id: 'g1_t3_ch2',
            title: { ar: 'الفصل الثاني: كيف تعمل الأعمال التجارية', en: 'Chapter 2: How Business Works' },
            lessons: [
              { id: 'g1_t3_ch2_l1', title: { ar: 'الدرس 1: الوظائف والأدوات', en: 'Lesson 1: Jobs and Tools' }, description: { ar: 'المهن المختلفة وأدواتها.', en: 'Different jobs and their tools.' } },
              { id: 'g1_t3_ch2_l2', title: { ar: 'الدرس 2: النقل', en: 'Lesson 2: Transportation' }, description: { ar: 'نقل البضائع والأشخاص.', en: 'Moving goods and people.' } }
            ]
          },
          {
            id: 'g1_t3_ch3',
            title: { ar: 'الفصل الثالث: البيع والشراء والادخار', en: 'Chapter 3: Buying, Selling, and Saving' },
            lessons: [
              { id: 'g1_t3_ch3_l1', title: { ar: 'الدرس 1: السوق', en: 'Lesson 1: The Market' }, description: { ar: 'كيف نشتري الطعام؟', en: 'How we buy food?' } },
              { id: 'g1_t3_ch3_l2', title: { ar: 'الدرس 2: التكلفة والادخار', en: 'Lesson 2: Cost and Saving' }, description: { ar: 'ادخار المال لشراء ما نريد.', en: 'Saving money to buy wants.' } }
            ]
          }
        ]
      },
      {
        id: 'g1_t4',
        title: { ar: 'المحور الرابع: التواصل', en: 'Theme 4: Communication' },
        term: 2,
        chapters: [
          {
            id: 'g1_t4_ch1',
            title: { ar: 'الفصل الأول: التواصل بالأرقام', en: 'Chapter 1: Communicating with Numbers' },
            lessons: [
              { id: 'g1_t4_ch1_l1', title: { ar: 'الدرس 1: الأرقام في حياتنا', en: 'Lesson 1: Numbers in Our Life' }, description: { ar: 'الأسعار، الساعات، والقياس.', en: 'Prices, clocks, and measurement.' } }
            ]
          },
          {
            id: 'g1_t4_ch2',
            title: { ar: 'الفصل الثاني: التواصل بالفن', en: 'Chapter 2: Communicating with Art' },
            lessons: [
              { id: 'g1_t4_ch2_l1', title: { ar: 'الدرس 1: التعبير بالفن', en: 'Lesson 1: Expressing with Art' }, description: { ar: 'الرسم والموسيقى والحركة.', en: 'Drawing, music, and movement.' } }
            ]
          }
        ]
      }
    ]
  },
  
  // ================= GRADE 2 =================
  grade2: {
    grade: GradeLevel.Grade2,
    themes: [
      // --- TERM 1 ---
      {
        id: 'g2_t1',
        title: { ar: 'المحور الأول: من أكون؟', en: 'Theme 1: Who Am I?' },
        term: 1,
        chapters: [
          {
            id: 'g2_t1_ch1',
            title: { ar: 'الفصل الأول: يوم في حياتي', en: 'Chapter 1: A Day in My Life' },
            lessons: [
              { id: 'g2_t1_ch1_l1', title: { ar: 'الدرس 1: عائلة نور', en: 'Lesson 1: Nour\'s Family' }, description: { ar: 'الأدوار والمسؤوليات في العائلة.', en: 'Roles and responsibilities in family.' } },
              { id: 'g2_t1_ch1_l2', title: { ar: 'الدرس 2: المشكلات والحلول', en: 'Lesson 2: Problems and Solutions' }, description: { ar: 'حل المشكلات اليومية.', en: 'Solving daily problems.' } },
              { id: 'g2_t1_ch1_l3', title: { ar: 'الدرس 3: المواطنة', en: 'Lesson 3: Citizenship' }, description: { ar: 'الاحترام والتعاون.', en: 'Respect and cooperation.' } }
            ]
          },
          {
            id: 'g2_t1_ch2',
            title: { ar: 'الفصل الثاني: الاعتناء بنفسي', en: 'Chapter 2: Taking Care of Me' },
            lessons: [
              { id: 'g2_t1_ch2_l1', title: { ar: 'الدرس 1: مراحل الحياة', en: 'Lesson 1: Life Stages' }, description: { ar: 'كيف ننمو ونتغير؟', en: 'How we grow and change?' } },
              { id: 'g2_t1_ch2_l2', title: { ar: 'الدرس 2: الطعام الصحي', en: 'Lesson 2: Healthy Food' }, description: { ar: 'مجموعات الغذاء.', en: 'Food groups.' } },
              { id: 'g2_t1_ch2_l3', title: { ar: 'الدرس 3: اتخاذ القرارات', en: 'Lesson 3: Making Choices' }, description: { ar: 'اختيارات صحية ومسؤولة.', en: 'Healthy and responsible choices.' } }
            ]
          },
          {
            id: 'g2_t1_ch3',
            title: { ar: 'الفصل الثالث: عندما أكبر', en: 'Chapter 3: When I Grow Up' },
            lessons: [
              { id: 'g2_t1_ch3_l1', title: { ar: 'الدرس 1: المهن', en: 'Lesson 1: Jobs' }, description: { ar: 'أنواع مختلفة من الوظائف.', en: 'Different types of jobs.' } },
              { id: 'g2_t1_ch3_l2', title: { ar: 'الدرس 2: اهتماماتي', en: 'Lesson 2: My Interests' }, description: { ar: 'ماذا أحب أن أفعل؟', en: 'What do I like to do?' } },
              { id: 'g2_t1_ch3_l3', title: { ar: 'الدرس 3: العلوم والتكنولوجيا', en: 'Lesson 3: STEM Careers' }, description: { ar: 'مهن المستقبل.', en: 'Future careers.' } }
            ]
          }
        ]
      },
      {
        id: 'g2_t2',
        title: { ar: 'المحور الثاني: العالم من حولي', en: 'Theme 2: The World Around Me' },
        term: 1,
        chapters: [
          {
            id: 'g2_t2_ch1',
            title: { ar: 'الفصل الأول: ماذا يوجد في السماء ليلاً؟', en: 'Chapter 1: What Is in the Night Sky?' },
            lessons: [
              { id: 'g2_t2_ch1_l1', title: { ar: 'الدرس 1: السماء ليلاً ونهاراً', en: 'Lesson 1: Day and Night Sky' }, description: { ar: 'الشمس والقمر والنجوم.', en: 'Sun, Moon, Stars.' } },
              { id: 'g2_t2_ch1_l2', title: { ar: 'الدرس 2: الأنماط في السماء', en: 'Lesson 2: Patterns in the Sky' }, description: { ar: 'كيف تتحرك النجوم؟', en: 'How stars move?' } },
              { id: 'g2_t2_ch1_l3', title: { ar: 'الدرس 3: الحجم والمسافة', en: 'Lesson 3: Size and Distance' }, description: { ar: 'لماذا تبدو الأشياء صغيرة؟', en: 'Why things look small?' } }
            ]
          },
          {
            id: 'g2_t2_ch2',
            title: { ar: 'الفصل الثاني: مساعدة بيئتي', en: 'Chapter 2: Helping My Habitat' },
            lessons: [
              { id: 'g2_t2_ch2_l1', title: { ar: 'الدرس 1: البيئات المصرية', en: 'Lesson 1: Egyptian Environments' }, description: { ar: 'أنواع البيئات في مصر.', en: 'Types of environments in Egypt.' } },
              { id: 'g2_t2_ch2_l2', title: { ar: 'الدرس 2: الطيور في مصر', en: 'Lesson 2: Birds of Egypt' }, description: { ar: 'الطيور ودورة حياتها.', en: 'Birds and their life cycle.' } }
            ]
          },
          {
            id: 'g2_t2_ch3',
            title: { ar: 'الفصل الثالث: تصميمات أثرية', en: 'Chapter 3: Monumental Designs' },
            lessons: [
              { id: 'g2_t2_ch3_l1', title: { ar: 'الدرس 1: عالمنا', en: 'Lesson 1: Our World' }, description: { ar: 'الأرض والماء واليابسة.', en: 'Earth, water, land.' } },
              { id: 'g2_t2_ch3_l2', title: { ar: 'الدرس 2: المياه', en: 'Lesson 2: Water Forms' }, description: { ar: 'صلب، سائل، غاز.', en: 'Solid, Liquid, Gas.' } },
              { id: 'g2_t2_ch3_l3', title: { ar: 'الدرس 3: الآثار', en: 'Lesson 3: Monuments' }, description: { ar: 'تصميم وبناء الآثار.', en: 'Designing and building monuments.' } }
            ]
          }
        ]
      },
      // --- TERM 2 ---
      {
        id: 'g2_t3',
        title: { ar: 'المحور الثالث: كيف يعمل العالم؟', en: 'Theme 3: How The World Works' },
        term: 2,
        chapters: [
          {
            id: 'g2_t3_ch1',
            title: { ar: 'الفصل الأول: النيل الذي أعرفه', en: 'Chapter 1: The Nile I Know' },
            lessons: [
              { id: 'g2_t3_ch1_l1', title: { ar: 'الدرس 1: خريطة مصر', en: 'Lesson 1: Map of Egypt' }, description: { ar: 'نهر النيل والمدن.', en: 'Nile River and cities.' } },
              { id: 'g2_t3_ch1_l2', title: { ar: 'الدرس 2: الطقس', en: 'Lesson 2: Weather' }, description: { ar: 'حالة الطقس في مصر.', en: 'Weather in Egypt.' } }
            ]
          },
          {
            id: 'g2_t3_ch2',
            title: { ar: 'الفصل الثاني: المدن وسكان النيل', en: 'Chapter 2: Cities and People of the Nile' },
            lessons: [
              { id: 'g2_t3_ch2_l1', title: { ar: 'الدرس 1: وظائف النقل', en: 'Lesson 1: Jobs in Transportation' }, description: { ar: 'من يعمل في المواصلات؟', en: 'Who works in transportation?' } },
              { id: 'g2_t3_ch2_l2', title: { ar: 'الدرس 2: صنع في مصر', en: 'Lesson 2: Made in Egypt' }, description: { ar: 'المحاصيل والصناعات المصرية.', en: 'Egyptian crops and industries.' } }
            ]
          },
          {
            id: 'g2_t3_ch3',
            title: { ar: 'الفصل الثالث: الحياة على ضفاف النيل', en: 'Chapter 3: Life Along the Nile' },
            lessons: [
              { id: 'g2_t3_ch3_l1', title: { ar: 'الدرس 1: المياه والحياة', en: 'Lesson 1: Water and Life' }, description: { ar: 'أهمية المياه وتنقيتها.', en: 'Importance of water and filtering.' } },
              { id: 'g2_t3_ch3_l2', title: { ar: 'الدرس 2: السكان', en: 'Lesson 2: Population' }, description: { ar: 'نمو السكان في مصر.', en: 'Population growth in Egypt.' } }
            ]
          }
        ]
      },
      {
        id: 'g2_t4',
        title: { ar: 'المحور الرابع: التواصل', en: 'Theme 4: Communication' },
        term: 2,
        chapters: [
          {
            id: 'g2_t4_ch1',
            title: { ar: 'الفصل الأول: التواصل في مجتمعي', en: 'Chapter 1: Communicating in My Community' },
            lessons: [
              { id: 'g2_t4_ch1_l1', title: { ar: 'الدرس 1: طرق التواصل', en: 'Lesson 1: Ways to Communicate' }, description: { ar: 'الرسائل والبريد الإلكتروني.', en: 'Letters and Emails.' } },
              { id: 'g2_t4_ch1_l2', title: { ar: 'الدرس 2: حل المشكلات', en: 'Lesson 2: Solving Problems' }, description: { ar: 'التواصل لحل الخلافات.', en: 'Communicating to solve conflicts.' } }
            ]
          },
          {
            id: 'g2_t4_ch2',
            title: { ar: 'الفصل الثاني: تواصل الثقافات', en: 'Chapter 2: Communicating Culture' },
            lessons: [
              { id: 'g2_t4_ch2_l1', title: { ar: 'الدرس 1: الاحتفالات', en: 'Lesson 1: Celebrations' }, description: { ar: 'شم النسيم والأعياد.', en: 'Sham El-Nessim and Feasts.' } },
              { id: 'g2_t4_ch2_l2', title: { ar: 'الدرس 2: الفنون والموسيقى', en: 'Lesson 2: Arts and Music' }, description: { ar: 'الموسيقى الشعبية والنشيد الوطني.', en: 'Folk music and National Anthem.' } }
            ]
          },
          {
            id: 'g2_t4_ch3',
            title: { ar: 'الفصل الثالث: أدوات التواصل', en: 'Chapter 3: Communication Tools' },
            lessons: [
              { id: 'g2_t4_ch3_l1', title: { ar: 'الدرس 1: التكنولوجيا', en: 'Lesson 1: Technology' }, description: { ar: 'الهاتف والإنترنت.', en: 'Phones and Internet.' } },
              { id: 'g2_t4_ch3_l2', title: { ar: 'الدرس 2: التلغراف والإشارات', en: 'Lesson 2: Telegraph and Signals' }, description: { ar: 'التواصل قديماً.', en: 'Communication long ago.' } }
            ]
          }
        ]
      }
    ]
  },

  // ================= GRADE 3 =================
  grade3: {
    grade: GradeLevel.Grade3,
    themes: [
       // --- TERM 1 ---
      {
        id: 'g3_t1',
        title: { ar: 'المحور الأول: من أكون؟ (الحياة الصحية)', en: 'Theme 1: Who Am I? (Living Healthy)' },
        term: 1,
        chapters: [
          {
            id: 'g3_t1_ch1',
            title: { ar: 'الفصل الأول: تنمية مهاراتي', en: 'Chapter 1: Making a Stronger Me' },
            lessons: [
              { id: 'g3_t1_ch1_l1', title: { ar: 'الدرس 1: المهارات الحياتية', en: 'Lesson 1: Life Skills' }, description: { ar: 'التعاون والتواصل وحل المشكلات.', en: 'Collaboration, Communication, Problem Solving.' } },
              { id: 'g3_t1_ch1_l2', title: { ar: 'الدرس 2: التفكير الناقد', en: 'Lesson 2: Critical Thinking' }, description: { ar: 'كيف نفكر بذكاء؟', en: 'How to think smart?' } }
            ]
          },
          {
            id: 'g3_t1_ch2',
            title: { ar: 'الفصل الثاني: الحفاظ على صحة الجسم', en: 'Chapter 2: Making a Healthy Body' },
            lessons: [
              { id: 'g3_t1_ch2_l1', title: { ar: 'الدرس 1: خيارات صحية', en: 'Lesson 1: Healthy Choices' }, description: { ar: 'الغذاء والرياضة والنوم.', en: 'Food, exercise, and sleep.' } },
              { id: 'g3_t1_ch2_l2', title: { ar: 'الدرس 2: جسمي', en: 'Lesson 2: My Body' }, description: { ar: 'الجلد والقلب والمعدة.', en: 'Skin, Heart, Stomach.' } }
            ]
          },
          {
            id: 'g3_t1_ch3',
            title: { ar: 'الفصل الثالث: الجسم السليم والطعام الصحي', en: 'Chapter 3: Get Fit with Healthy Eating' },
            lessons: [
              { id: 'g3_t1_ch3_l1', title: { ar: 'الدرس 1: المقصف المدرسي', en: 'Lesson 1: School Canteen' }, description: { ar: 'اختيار طعام صحي.', en: 'Choosing healthy food.' } },
              { id: 'g3_t1_ch3_l2', title: { ar: 'الدرس 2: الفيتامينات والمعادن', en: 'Lesson 2: Vitamins and Minerals' }, description: { ar: 'أهمية العناصر الغذائية.', en: 'Importance of nutrients.' } },
              { id: 'g3_t1_ch3_l3', title: { ar: 'الدرس 3: أهمية الماء', en: 'Lesson 3: Why Water Matters' }, description: { ar: 'فوائد شرب الماء.', en: 'Benefits of drinking water.' } }
            ]
          }
        ]
      },
      {
        id: 'g3_t2',
        title: { ar: 'المحور الثاني: العالم من حولي (الاهتمام بعالمنا)', en: 'Theme 2: The World Around Me (Taking Care of Our World)' },
        term: 1,
        chapters: [
          {
            id: 'g3_t2_ch1',
            title: { ar: 'الفصل الأول: آثار التغيرات البيئية', en: 'Chapter 1: When Habitats Change' },
            lessons: [
              { id: 'g3_t2_ch1_l1', title: { ar: 'الدرس 1: احتياجات الكائنات الحية', en: 'Lesson 1: Needs of Living Organisms' }, description: { ar: 'الغذاء والمأوى والماء.', en: 'Food, shelter, water.' } },
              { id: 'g3_t2_ch1_l2', title: { ar: 'الدرس 2: التغيرات البيئية', en: 'Lesson 2: Environmental Changes' }, description: { ar: 'الجفاف والفيضان والتلوث.', en: 'Drought, Flood, Pollution.' } }
            ]
          },
          {
            id: 'g3_t2_ch2',
            title: { ar: 'الفصل الثاني: المياه على كوكبنا', en: 'Chapter 2: Water, Water Everywhere' },
            lessons: [
              { id: 'g3_t2_ch2_l1', title: { ar: 'الدرس 1: الواحات', en: 'Lesson 1: Oases' }, description: { ar: 'المياه في الصحراء.', en: 'Water in the desert.' } },
              { id: 'g3_t2_ch2_l2', title: { ar: 'الدرس 2: دورة الماء', en: 'Lesson 2: Water Cycle' }, description: { ar: 'التبخر والتكثف والهطول.', en: 'Evaporation, Condensation, Precipitation.' } },
              { id: 'g3_t2_ch2_l3', title: { ar: 'الدرس 3: المناخ', en: 'Lesson 3: Climate' }, description: { ar: 'مقارنة المناخ في مصر.', en: 'Comparing climates in Egypt.' } }
            ]
          },
          {
            id: 'g3_t2_ch3',
            title: { ar: 'الفصل الثالث: كيف يمكنني المساعدة؟', en: 'Chapter 3: How Can I Help?' },
            lessons: [
              { id: 'g3_t2_ch3_l1', title: { ar: 'الدرس 1: الفيضانات', en: 'Lesson 1: Floods' }, description: { ar: 'تأثير الأمطار الغزيرة.', en: 'Impact of heavy rains.' } },
              { id: 'g3_t2_ch3_l2', title: { ar: 'الدرس 2: الحماية من الفيضان', en: 'Lesson 2: Flood Prevention' }, description: { ar: 'السدود وأكياس الرمل.', en: 'Dams and sandbags.' } }
            ]
          }
        ]
      },
      // --- TERM 2 ---
      {
        id: 'g3_t3',
        title: { ar: 'المحور الثالث: كيف يعمل العالم؟ (الأصول)', en: 'Theme 3: How the World Works (Origins)' },
        term: 2,
        chapters: [
          {
            id: 'g3_t3_ch1',
            title: { ar: 'الفصل الأول: أنماط التغير', en: 'Chapter 1: Patterns of Change' },
            lessons: [
              { id: 'g3_t3_ch1_l1', title: { ar: 'الدرس 1: الوراثة', en: 'Lesson 1: Heredity' }, description: { ar: 'الصفات الموروثة من الآباء.', en: 'Traits inherited from parents.' } },
              { id: 'g3_t3_ch1_l2', title: { ar: 'الدرس 2: البقاء والتكيف', en: 'Lesson 2: Survival and Adaptation' }, description: { ar: 'التمويه والمناقير.', en: 'Camouflage and beaks.' } }
            ]
          },
          {
            id: 'g3_t3_ch2',
            title: { ar: 'الفصل الثاني: نظرة على الفنون القديمة', en: 'Chapter 2: A New Look to Ancient Art' },
            lessons: [
              { id: 'g3_t3_ch2_l1', title: { ar: 'الدرس 1: الفنون القديمة', en: 'Lesson 1: Ancient Arts' }, description: { ar: 'الرسم والنحت والمجوهرات.', en: 'Painting, sculpture, jewelry.' } },
              { id: 'g3_t3_ch2_l2', title: { ar: 'الدرس 2: المواد الخام', en: 'Lesson 2: Raw Materials' }, description: { ar: 'مم تصنع الأشياء؟', en: 'What are things made of?' } }
            ]
          },
          {
            id: 'g3_t3_ch3',
            title: { ar: 'الفصل الثالث: أصول الطب', en: 'Chapter 3: Origins of Medicine' },
            lessons: [
              { id: 'g3_t3_ch3_l1', title: { ar: 'الدرس 1: المرض والعلاج', en: 'Lesson 1: Sickness and Treatment' }, description: { ar: 'كيف نتعامل مع المرض؟', en: 'How to handle sickness?' } },
              { id: 'g3_t3_ch3_l2', title: { ar: 'الدرس 2: الطب قديماً وحديثاً', en: 'Lesson 2: Medicine Then and Now' }, description: { ar: 'إيمحتب والمستشفيات.', en: 'Imhotep and hospitals.' } }
            ]
          }
        ]
      },
      {
        id: 'g3_t4',
        title: { ar: 'المحور الرابع: التواصل (الروابط)', en: 'Theme 4: Communication (Connections)' },
        term: 2,
        chapters: [
          {
            id: 'g3_t4_ch1',
            title: { ar: 'الفصل الأول: الربط بين القوى', en: 'Chapter 1: Connecting Forces' },
            lessons: [
              { id: 'g3_t4_ch1_l1', title: { ar: 'الدرس 1: الحركة', en: 'Lesson 1: Motion' }, description: { ar: 'حركة الأشياء والتنبؤ بها.', en: 'Movement and prediction.' } },
              { id: 'g3_t4_ch1_l2', title: { ar: 'الدرس 2: المغناطيس', en: 'Lesson 2: Magnets' }, description: { ar: 'قوة الجذب والمجال المغناطيسي.', en: 'Attraction and magnetic field.' } }
            ]
          },
          {
            id: 'g3_t4_ch2',
            title: { ar: 'الفصل الثاني: التواصل بين البشر', en: 'Chapter 2: Connecting People' },
            lessons: [
              { id: 'g3_t4_ch2_l1', title: { ar: 'الدرس 1: التكنولوجيا عبر الزمن', en: 'Lesson 1: Technology Through Time' }, description: { ar: 'تطور وسائل النقل والاتصال.', en: 'Evolution of transport and communication.' } },
              { id: 'g3_t4_ch2_l2', title: { ar: 'الدرس 2: التجارة', en: 'Lesson 2: Trade' }, description: { ar: 'التبادل التجاري والاستيراد والتصدير.', en: 'Trade, import, and export.' } }
            ]
          },
          {
            id: 'g3_t4_ch3',
            title: { ar: 'الفصل الثالث: التواصل مع المجتمع', en: 'Chapter 3: Connecting with Community' },
            lessons: [
              { id: 'g3_t4_ch3_l1', title: { ar: 'الدرس 1: الأخبار', en: 'Lesson 1: The News' }, description: { ar: 'كيف نعرف الأخبار؟', en: 'How do we get news?' } },
              { id: 'g3_t4_ch3_l2', title: { ar: 'الدرس 2: وسائل الإعلام', en: 'Lesson 2: Media' }, description: { ar: 'المقابلات وكتابة التقارير.', en: 'Interviews and reporting.' } }
            ]
          }
        ]
      }
    ]
  }
};