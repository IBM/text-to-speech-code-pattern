/* eslint max-len: off */
const ES_TEXT =
  'Consciente de su patrimonio espiritual y moral, la Unión está fundada sobre los valores indivisibles y universales de la dignidad humana, la libertad, la igualdad y la solidaridad, y se basa en los principios de la democracia y el Estado de Derecho. Al instituir la ciudadanía de la Unión y crear un espacio de libertad, seguridad y justicia, sitúa a la persona en el centro de su actuación.';
const FR_TEXT =
  "Consciente de son patrimoine spirituel et moral, l'Union se fonde sur les valeurs indivisibles et universelles de dignité humaine, de liberté, d'égalité et de solidarité; elle repose sur le principe de la démocratie et le principe de l'État de droit. Elle place la personne au coeur de son action en instituant la citoyenneté de l'Union et en créant un espace de liberté, de sécurité et de justice.";
const US_TEXT =
  'Conscious of its spiritual and moral heritage, the Union is founded on the indivisible, universal values of human dignity, freedom, equality and solidarity; it is based on the principles of democracy and the rule of law. It places the individual at the heart of its activities, by establishing the citizenship of the Union and by creating an area of freedom, security and justice.';
const DE_TEXT =
  'In dem Bewusstsein ihres geistig-religiösen und sittlichen Erbes gründet sich die Union auf die unteilbaren und universellen Werte der Würde des Menschen, der Freiheit, der Gleichheit und der Solidarität. Sie beruht auf den Grundsätzen der Demokratie und der Rechtsstaatlichkeit. Sie stellt den Menschen in den Mittelpunkt ihres Handelns, indem sie die Unionsbürgerschaft und einen Raum der Freiheit, der Sicherheit und des Rechts begründet.';
const IT_TEXT =
  "L'Unione contribuisce alla salvaguardia e allo sviluppo di questi valori comuni nel rispetto della diversità delle culture e delle tradizioni dei popoli d'Europa, nonché dell'identità nazionale degli Stati membri e dell'ordinamento dei loro pubblici poteri a livello nazionale, regionale e locale; essa si sforza di promuovere uno sviluppo equilibrato e sostenibile e assicura la libera circolazione delle persone, dei servizi, delle merci e dei capitali, nonché la libertà di stabilimento.";
const JP_TEXT =
  'こちらでは配送手続きのご予約・変更を承っております。お客様の会員番号をお願いいたします。会員番号は、０１２３４５６７、ですね。確認いたしました。現在、３月２５日、ご自宅へ配送のご予約を頂いております。それでは、３月２５日、ご自宅へ配送の予定を、３月２６日のご配送に変更いたします。３月２６日は、降雪のため、配送が遅れることがあります。';
const PT_TEXT =
  'Consciente do seu patrimônio espiritual e moral, a União é fundamentada nos valores indivisíveis e universais da dignidade humana, liberdade, igualdade e solidariedade; é baseada nos princípios da democracia e estado de direito. Ela coloca o indivíduo no centro de suas ações, ao instituir a cidadania da União e ao criar um espaço de liberdade, segurança e justiça.';
const AR_TEXT =
  'تقوم خدمة I B M النص إلى خدمة الكلام بتحويل النص المكتوب إلى صوت طبيعي في مجموعة متنوعة من اللغات والأصوات.';
const CN_TEXT =
  '基于海量数据的云计算、大数据、人工智能、区块链等新兴技术，正在对商业产生深远的影响。科技变革的步伐持续加速，各行各业的领先企业正在将关键业务应用转移到云端，并积极利用 AI，重塑业务。';
const NL_TEXT =
  'De volkeren van Europa hebben besloten een op gemeenschappelijke waarden gegrondveste vreedzame toekomst te delen door onderling een steeds hechter verbond tot stand te brengen. De Unie, die zich bewust is van haar geestelijke en morele erfgoed, heeft haar grondslag in de ondeelbare en universele waarden van menselijke waardigheid en van vrijheid, gelijkheid en solidariteit. Zij berust op het beginsel van democratie en het beginsel van de rechtsstaat. De Unie stelt de mens centraal in haar optreden, door het burgerschap van de Unie in te stellen en een ruimte van vrijheid, veiligheid en recht tot stand te brengen.';

// Sample text values with SSML
const ES_SSML =
  '<p><s>Consciente de su patrimonio espiritual y moral<break time="300ms"/>, la Unión está fundada sobre los valores indivisibles y universales de la dignidad humana, <prosody rate="-15%"> la libertad, la igualdad y la solidaridad, </prosody> y se basa en los principios de la democracia y el Estado de Derecho<break time="500ms"/>.</s> <s><prosody rate="+20%">Al instituir la ciudadanía de la Unión </prosody> y crear un espacio de libertad, seguridad y justicia, sitúa a la persona en el centro de su actuación.</s></p>';
const FR_SSML =
  '<p><s>Consciente de son patrimoine spirituel et moral<break time="300ms"/>,  l\'Union se fonde sur les valeurs indivisibles et universelles de dignité humaine,  <prosody rate="-15%"> de  liberté, d\'égalité et de solidarité; </prosody> elle repose sur le principe de la démocratie et le principe de l\'État de droit <break time="500ms"/>. Elle place la personne au coeur de son action en instituant la citoyenneté de l\'Union et en créant un espace de liberté, de sécurité et de justice.</s></p>';
const US_GB_SSML =
  '<p><s>Conscious of its spiritual and moral heritage <break time="300ms"/>, the Union is founded on the indivisible, universal values of <prosody rate="-15%">human dignity, freedom, equality and solidarity.</prosody> It is based on the principles of democracy and the rule of law <break time="500ms"/>. </s> <s> It places the individual at the heart of its activities, <prosody rate="+15%">by establishing the citizenship of the Union</prosody> and by creating an area of freedom, security and justice.</s></p>';
const DE_SSML =
  '<p><s>In dem Bewusstsein ihres geistig-religiösen und sittlichen <phoneme alphabet="ibm" ph=".1R.0bIs">Erbes</phoneme> <break time="300ms"/> gründet sich die Union auf die <prosody rate="-15%">unteilbaren und universellen  Werte der Würde des Menschen, der Freiheit, der Gleichheit und der Solidarität.</prosody> Sie beruht auf den Grundsätzen der Demokratie und der Rechtsstaatlichkeit<break time="1s"/>. Sie stellt den Menschen in den Mittelpunkt ihres <phoneme alphabet="ibm" ph=".1hAn.0d@lns"> Handelns</phoneme>, <prosody rate="+10%">indem sie die Unionsbürgerschaft und einen Raum der Freiheit, der Sicherheit und des Rechts begründet.</prosody></s></p>';
const IT_SSML =
  '<p><s>Consapevole del suo patrimonio spirituale e morale<break time="300ms"/>, l\'Unione si fonda sui valori indivisibili e universali della dignità umana, <prosody rate="-15%">della libertà, dell\'uguaglianza e della solidarietà; </prosody> essa si basa sul principio della democrazia e sul principio dello Stato di diritto<break time="500ms"/>.</s><s> Pone la persona al centro della sua azione istituendo la cittadinanza dell\'Unione e creando uno spazio di libertà, sicurezza e giustizia.</s></p>';
const JP_SSML =
  '<p><s>こちらでは配送手続きのご予約・変更を承っております。お客様の会員番号をお願いいたします。<break time="1000ms"/>会員番号は、０１２３４５６７、ですね。確認いたしました。現在、３月２５日、ご自宅へ配送のご予約を頂いております。<break time="500ms"/>それでは、３月２５日、ご自宅へ配送の予定を、３月２６日のご配送に変更いたします。３月２６日は、降雪のため、配送が遅れることがあります。</s></p>';
const PT_SSML =
  '<p><s>Consciente do seu patrimônio espiritual e moral<break time="300ms"/>, a União é fundamentada nos valores indivisíveis e universais da dignidade humana, <prosody rate="-15%">liberdade, igualdade e solidariedade; </prosody> é baseada nos princípios da democracia e estado de direito<break time="500ms"/>. </s> <s> <prosody rate="+15%">Ela coloca o indivíduo no centro de suas ações, </prosody> ao instituir a cidadania da União e ao criar um espaço de liberdade, segurança e justiça.</s></p>';

// Sample text values with Voice Transformation SSML (Allison)
const US_VOICE_SSML_ALLISON =
  'Hello! I\'m Allison, but you can change my voice however you wish. <voice-transformation type="Custom" glottal_tension="-80%"> For example, you can make my voice a bit softer, </voice-transformation> <voice-transformation type="Custom" glottal_tension="40%" breathiness="40%"> or a bit strained. </voice-transformation><voice-transformation type="Custom" timbre="Breeze" timbre_extent="60%"> ' +
  'You can alter my voice timbre making me sound like this person, </voice-transformation> <voice-transformation type="Custom" timbre="Sunrise"> or like another person in your different applications. </voice-transformation><voice-transformation type="Custom" breathiness="90%"> You can make my voice more breathy than it is normally. </voice-transformation><voice-transformation type="Young" strength="80%"> ' +
  'I can speak like a young girl. </voice-transformation><voice-transformation type="Custom" pitch="-30%" pitch_range="80%" rate="60%" glottal_tension="-80%" timbre="Sunrise"> And you can combine all this with modifications of my speech rate and my tone. </voice-transformation>';

// Sample text values with Voice Transformation SSML (Lisa)
const US_VOICE_SSML_LISA =
  'Hello! I\'m Lisa, but you can change my voice however you wish. <voice-transformation type="Custom" glottal_tension="-80%"> For example, you can make my voice a bit softer, </voice-transformation> <voice-transformation type="Custom" glottal_tension="40%" breathiness="40%"> or a bit strained. </voice-transformation><voice-transformation type="Custom" timbre="Breeze" timbre_extent="60%"> You can alter my voice timbre making me sound like this person, </voice-transformation> <voice-transformation type="Custom" timbre="Sunrise"> or like another person in your different applications. </voice-transformation><voice-transformation type="Custom" breathiness="90%"> You can make my voice more breathy than it is normally. </voice-transformation><voice-transformation type="Young" strength="80%"> I can speak like a young girl. </voice-transformation><voice-transformation type="Custom" pitch="20%" pitch_range="80%" rate="60%" glottal_tension="-80%" timbre="Sunrise"> And you can combine all this with modifications of my speech rate and my tone. </voice-transformation>';
const US_VOICE_SSML_MICHAEL =
  'Hello! I\'m Michael, but you can change my voice however you wish. <voice-transformation type="Custom" glottal_tension="-80%"> For example, you can make my voice a bit softer, </voice-transformation> <voice-transformation type="Custom" glottal_tension="40%" breathiness="40%"> or a bit strained. </voice-transformation><voice-transformation type="Custom" timbre="Breeze" timbre_extent="60%"> You can alter my voice timbre making me sound like this person, </voice-transformation> <voice-transformation type="Custom" timbre="Sunrise"> or like another person in your different applications. </voice-transformation><voice-transformation type="Custom" breathiness="90%"> You can make my voice more breathy than it is normally. </voice-transformation><voice-transformation type="Young" strength="80%"> I can speak like a young boy. </voice-transformation><voice-transformation type="Custom" pitch="20%" pitch_range="80%" rate="60%" glottal_tension="-80%" timbre="Sunrise"> And you can combine all this with modifications of my speech rate and my tone. </voice-transformation>';

export const sampleText = {
  'en-US_AllisonVoice': US_VOICE_SSML_ALLISON,
  'en-US_AllisonV3Voice': US_TEXT,
  'de-DE_BirgitVoice': DE_TEXT,
  'de-DE_BirgitV3Voice': DE_SSML,
  'de-DE_DieterVoice': DE_TEXT,
  'de-DE_DieterV3Voice': DE_SSML,
  'ja-JP_EmiVoice': JP_TEXT,
  'ja-JP_EmiV3Voice': JP_SSML,
  'nl-NL_EmmaVoice': NL_TEXT,
  'es-ES_EnriqueVoice': ES_TEXT,
  'es-ES_EnriqueV3Voice': ES_SSML,
  'it-IT_FrancescaVoice': IT_TEXT,
  'it-IT_FrancescaV3Voice': IT_SSML,
  'pt-BR_IsabelaVoice': PT_TEXT,
  'pt-BR_IsabelaV3Voice': PT_SSML,
  'en-GB_KateVoice': US_TEXT,
  'en-GB_KateV3Voice': US_GB_SSML,
  'es-ES_LauraVoice': ES_TEXT,
  'es-ES_LauraV3Voice': ES_SSML,
  'zh-CN_LiNaVoice': CN_TEXT,
  'nl-NL_LiamVoice': NL_TEXT,
  'en-US_LisaVoice': US_VOICE_SSML_LISA,
  'en-US_LisaV3Voice': US_TEXT,
  'en-US_MichaelVoice': US_VOICE_SSML_MICHAEL,
  'en-US_MichaelV3Voice': US_TEXT,
  'ar-AR_OmarVoice': AR_TEXT,
  'fr-FR_ReneeVoice': FR_TEXT,
  'fr-FR_ReneeV3Voice': FR_SSML,
  'es-LA_SofiaVoice': ES_TEXT,
  'es-LA_SofiaV3Voice': ES_SSML,
  'es-US_SofiaVoice': ES_TEXT,
  'es-US_SofiaV3Voice': ES_SSML,
  'zh-CN_WangWeiVoice': CN_TEXT,
  'zh-CN_ZhangJingVoice': CN_TEXT,
};
