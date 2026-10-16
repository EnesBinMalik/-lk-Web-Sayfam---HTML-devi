export interface StudentProfile {
  fullName: string;
  profession: string;
  aboutText: string;
  interestsText: string;
  hobbies: string[];
  quote: string;
  email: string;
  githubUrl: string;
}

export const defaultProfile: StudentProfile = {
  fullName: 'Enes Öztürk',
  profession: 'Web Geliştirme Öğrencisi & Yazılımcı Adayı',
  aboutText:
    'Merhaba! Ben Enes Öztürk. Yazılım ve web geliştirme dünyasına tutkuyla ilk adımlarımı atıyorum. Bu web sayfası, web geliştirme eğitimim kapsamında hazırladığım ilk ödevimdir ve temel HTML etiketleri kullanılarak sıfırdan oluşturulmuştur.',
  interestsText:
    'Günlük hayatımda yeni teknolojileri araştırmayı, problem çözmeyi ve algoritmalar üzerinde düşünmeyi çok seviyorum. Kodlama yaparken her satırda yeni bir şey keşfetmek ve hataları düzelterek sonuca ulaşmak beni çok motive ediyor.',
  hobbies: [
    'HTML, CSS ve JavaScript pratikleri yapmak',
    'Teknoloji, bilim ve kişisel gelişim kitapları okumak',
    'Kod yazarken odaklanmayı artıran enstrümantal müzikler dinlemek',
    'Doğa yürüyüşlerine çıkmak ve fotoğraf çekmek',
    'Fincan fincan filtre kahve eşliğinde yeni projeler üretmek',
  ],
  quote: 'Doğrular, yanlışlar yapılarak bulunur. Denemekten asla vazgeçme!',
  email: 'enes.ozturk@example.com',
  githubUrl: 'https://github.com',
};

export interface AssignmentCriterion {
  id: string;
  title: string;
  description: string;
  tag: string;
  status: 'passed' | 'pending';
}

export const assignmentCriteria: AssignmentCriterion[] = [
  {
    id: 'name-header',
    title: 'Ad - Soyad Başlığı',
    description: 'Site açıldığında adınız ve soyadınız başlık (h1) şeklinde gösterilmelidir.',
    tag: '<h1>',
    status: 'passed',
  },
  {
    id: 'about-subheading',
    title: 'Hakkımda Alt Başlığı',
    description: "Ad-soyadın altında alt başlık olarak tam olarak 'Hakkımda' (h2) yazmalıdır.",
    tag: '<h2>',
    status: 'passed',
  },
  {
    id: 'content-paragraph',
    title: 'Neler Yaptığı ve Hoşlandıkları',
    description: 'Paragraf (p) ve listelerde neler yaptığınızı ve nelerden hoşlandığınızı anlatmalısınız.',
    tag: '<p> & <ul>',
    status: 'passed',
  },
  {
    id: 'filename-index',
    title: "Dosya Adı: 'index.html'",
    description: "Web sitenizi kaydederken dosya adı olarak 'index.html' seçilmelidir.",
    tag: 'index.html',
    status: 'passed',
  },
  {
    id: 'code-comments',
    title: 'Açıklayıcı Yorum Satırları',
    description: 'Yazdığınız kodları adım adım açıklayan HTML yorum satırları eklenmelidir.',
    tag: '<!-- yorum -->',
    status: 'passed',
  },
];

export function generateIndexHtmlCode(profile: StudentProfile): string {
  const hobbiesList = profile.hobbies
    .map(
      (hobby) =>
        `        <!-- Liste Elemanı: İlgi alanı / hobi -->\n        <li>${escapeHtml(hobby)}</li>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<!-- ============================================================== -->
<!-- ÖDEV: İlk Web Sayfamızı Oluşturmak                             -->
<!-- DOSYA ADI: index.html                                          -->
<!-- GELİŞTİRİCİ: ${profile.fullName}                              -->
<!-- ============================================================== -->
<html lang="tr">
<head>
    <!-- Karakter kodlamasını UTF-8 (Türkçe karakter desteği) olarak belirliyoruz -->
    <meta charset="UTF-8">
    <!-- Mobil cihazlar ve tüm ekran boyutları için duyarlı görünüm ayarı -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İlk Web Sayfam - ${escapeHtml(profile.fullName)}</title>
</head>
<body>

    <!-- ========================================================== -->
    <!-- 1. ADIM: Ad ve Soyadı Gösteren Ana Başlık (h1)              -->
    <!-- Kural: Site açıldığında adınız ve soyadınız başlık olmalıdır-->
    <!-- ========================================================== -->
    <h1>${escapeHtml(profile.fullName)}</h1>

    <!-- ========================================================== -->
    <!-- 2. ADIM: 'Hakkımda' Alt Başlığı (h2)                        -->
    <!-- Kural: Ad-Soyadın altında alt başlık olarak Hakkımda yazmalı-->
    <!-- ========================================================== -->
    <h2>Hakkımda</h2>

    <!-- ========================================================== -->
    <!-- 3. ADIM: Neler Yaptığımı Anlatan Paragraf (p)              -->
    <!-- ========================================================== -->
    <p>
        ${escapeHtml(profile.aboutText)}
    </p>

    <!-- ========================================================== -->
    <!-- 4. ADIM: Nelerden Hoşlandığımı Anlatan İkinci Paragraf (p) -->
    <!-- ========================================================== -->
    <p>
        ${escapeHtml(profile.interestsText)}
    </p>

    <!-- ========================================================== -->
    <!-- 5. ADIM: İlgi Alanları ve Hobiler Alt Başlığı (h3)         -->
    <!-- ========================================================== -->
    <h3>Nelerden Hoşlanırım?</h3>

    <!-- ========================================================== -->
    <!-- 6. ADIM: Sırasız Liste (ul) ile Hobilerin Listelenmesi     -->
    <!-- ========================================================== -->
    <ul>
${hobbiesList}
    </ul>

    <!-- ========================================================== -->
    <!-- 7. ADIM: Günün Sözü ve Kapanış Notu                       -->
    <!-- ========================================================== -->
    <p>
        <em>"${escapeHtml(profile.quote)}"</em>
    </p>

    <!-- ========================================================== -->
    <!-- İletişim Bilgisi                                           -->
    <!-- ========================================================== -->
    <p>
        <small>İletişim: ${escapeHtml(profile.email)}</small>
    </p>

</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
