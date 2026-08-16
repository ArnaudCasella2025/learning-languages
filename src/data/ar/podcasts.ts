import type { GeneratedPodcast } from "../../types";

/**
 * Épisodes écrits à l'avance (pas générés par l'IA), un par palier de
 * vocabulaire, sur le même principe que src/data/it/podcasts.ts : chaque
 * script s'appuie de bonne foi sur le vocabulaire déjà introduit à ce
 * palier (voir l'ordre dans vocab.ts), plus la "glue" grammaticale
 * indispensable (accord, article défini, pluriels naturels).
 *
 * Le deck arabe (341 mots) est plus petit que le deck italien (546 mots) :
 * par honnêteté, il y a ici 3 épisodes au lieu de 5, et ils resteront
 * courts tant que le vocabulaire ne permet pas plus — mieux vaut un
 * épisode court et fiable qu'un texte gonflé avec des mots pas encore
 * appris. D'autres paliers seront ajoutés au fur et à mesure (voir
 * README).
 */
export const milestonePodcasts: Omit<GeneratedPodcast, "id" | "createdAt">[] = [
  {
    title: "الحلقة ١ — التحية والصفات",
    level: 1,
    kind: "milestone",
    milestone: 50,
    script: `مرحبًا! أنا هنا لمساعدتكم على تكلم اللغة العربية.

أنا سعيد. أنتَ سعيد. هو سعيد. هي سعيدة. نحن هنا. أنتم هناك. هم أيضًا سعداء.

أنا كبير، وأنتَ صغير. هي جميلة، وهو جيد. هذا سهل، وذلك صعب.

صباح الخير! مساء الخير! كيف حالك؟ أنا بخير، شكرًا. وأنتَ؟

نعم، لا، من فضلك، شكرًا، عفوًا. كلمات صغيرة، لكن مهمة جدًا كل يوم.

ما اسمك؟ اسمي... تشرفنا! مع السلامة، وإلى اللقاء في الحلقة القادمة.`,
  },
  {
    title: "الحلقة ٢ — الأرقام والأيام",
    level: 1,
    kind: "milestone",
    milestone: 100,
    script: `مرحبًا بكم من جديد! اليوم نتعلم الأرقام والأيام.

صفر، واحد، اثنان، ثلاثة، أربعة، خمسة، ستة، سبعة، ثمانية، تسعة، عشرة. ثم أحد عشر، اثنا عشر، ثلاثة عشر... إلى عشرين. وأيضًا: ثلاثون، أربعون، خمسون، مئة.

أنا عندي رقم: خمسة. وأنتَ عندك رقم: عشرة. كم رقمك؟

أيام الأسبوع: الأحد، الإثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت. سبعة أيام.

اليوم هو الإثنين. غدًا هو الثلاثاء. وأمس كان الأحد.

فعل جديد: ذهب. أنا أذهب، وأنتَ تذهب، وهو يذهب، ونحن نذهب. إلى أين تذهب اليوم؟

شكرًا لاستماعكم، وإلى الحلقة الثالثة!`,
  },
  {
    title: "الحلقة ٣ — العائلة والوقت",
    level: 1,
    kind: "milestone",
    milestone: 150,
    script: `أهلًا وسهلًا بكم في الحلقة الثالثة! اليوم موضوعنا العائلة والوقت.

العائلة: الأم والأب، الابن والابنة، الأخ والأخت، الجد والجدة، الصديق والصديقة. عندي عائلة كبيرة: أم وأب وأخ وأخت.

الوقت في اليوم: الصباح، بعد الظهر، المساء، الليل. اليوم، غدًا، أمس، الآن، دائمًا، أبدًا.

كلمات السؤال: من، ماذا، متى، أين، لماذا، كيف، كم. من أنتَ؟ ماذا تفعل؟ متى تذهب؟ أين تسكن؟

فعل جديد: أحب. أنا أحب عائلتي. وأنتَ، ماذا تحب؟

قصة صغيرة: في الصباح، أشرب قهوة مع أبي. بعد الظهر، أعمل أو أدرس. في المساء، أتكلم مع أخي. قبل النوم، أقول: تصبح على خير!

جدي يقول دائمًا: "العائلة أهم شيء." وهو محق.

شكرًا لاستماعكم إلى هذه الحلقات الثلاث! إلى اللقاء قريبًا.`,
  },
];
