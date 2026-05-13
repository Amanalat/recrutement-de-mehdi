'use strict';

// ══════════════════════════════════════════════════
//  CONFIGURATION
//  Modifiez ici les codes d'accès à la session.
// ══════════════════════════════════════════════════

const ADMIN_CODE = 'mehdi2024'; // code animateur


// ══════════════════════════════════════════════════
//  ÉTAPES
//  Chaque objet = une étape du jeu.
//
//  Champs obligatoires :
//    title   — numéro affiché (ex. "Étape 1")
//    sub     — sous-titre (ex. "Découverte du CV")
//    q       — question de vote commune aux deux rôles
//    min/max — libellés des extrémités de l'échelle Likert
//    biais   — nom du biais cognitif
//    baisDef — définition courte du biais
//    biaisC  — explication du biais côté candidat (Mehdi)
//    biaisR  — explication du biais côté recruteur (Sophie)
//
//  Champs optionnels :
//    qC — question spécifique au candidat (si différente de q)
//    qR — question spécifique au recruteur (si différente de q)
// ══════════════════════════════════════════════════

const STEPS = [
  {
    title: 'Étape 1',
    sub:   'Découverte du CV',
    q:     'À la lecture de ce CV, ce profil vous semble-t-il convaincant pour le poste ?',
    min:   'Pas du tout convaincant',
    max:   'Tout à fait convaincant',
    biais:    'Biais de saillance',
    baisDef:  "Notre attention se focalise sur l'élément le plus visible et lui accorde un poids décisif, au détriment d'informations plus pertinentes mais moins frappantes.",
    biaisC:   "Vous connaissez la valeur de votre bénévolat — 18 mois d'engagement réel, des résultats mesurables. Le trou d'un mois est une virgule dans votre histoire.",
    biaisR:   "Le trou visuel dans la chronologie attire immédiatement l'œil et active le souvenir du candidat précédent. Même si tout le reste est solide, c'est cette absence qui reste.",
  },
  {
    title: 'Étape 2',
    sub:   'Le trou dans le CV',
    q:     "Comment s'est passé cet échange sur le départ de Lumeo ?",
    min:   'Très mal',
    max:   'Très bien',
    biais:    'Effet Pygmalion',
    baisDef:  "Les attentes qu'on a envers quelqu'un modifient inconsciemment notre comportement — et provoquent chez l'autre exactement la réaction qu'on redoutait.",
    biaisC:   "Vous sentez la méfiance dans le ton de Sophie. Ça vous ferme. Vous avez peur de dire la vérité — pas parce que vous avez quelque chose à cacher, mais parce que vous savez qu'on ne vous croira pas.",
    biaisR:   "Votre méfiance a durci votre ton sans que vous le réalisiez. Mehdi a senti le jugement et s'est refermé. Vous avez obtenu exactement ce que vous craigniez — et interprété sa fermeture comme une confirmation.",
  },
  {
    title: 'Étape 3',
    sub:   'La décision de recrutement',
    q:     'Cette décision vous semble-t-elle avoir été la bonne ?',
    min:   'Mauvaise décision',
    max:   'Bonne décision',
    biais:    'Rationalisation',
    baisDef:  "Après avoir pris une décision sous contrainte, on fabrique des justifications logiques pour réduire l'inconfort du doute — et se convaincre qu'on a bien fait.",
    biaisC:   "Vous avez choisi ComStudio en connaissance de cause, en renonçant à une autre offre. C'était un pari réfléchi, pas une fuite en avant.",
    biaisR:   "Vous avez dit oui sous pression, avec des réserves. À peine le contrat signé, vous avez commencé à construire des arguments pour vous convaincre — 'il a du potentiel', 'on verra bien' — plutôt que d'admettre votre doute.",
  },
  {
    title: 'Étape 4',
    sub:   'Le premier jour',
    q:     "Comment s'est passé ce premier jour ?",
    min:   'Très mal',
    max:   'Très bien',
    biais:    "Erreur fondamentale d'attribution",
    baisDef:  "On explique le comportement des autres par ce qu'ils sont, pas par la situation dans laquelle ils se trouvent — et on s'exonère des conditions qu'on a créées.",
    biaisC:   "Vous avez tout fait pour vous montrer professionnel : arriver à l'heure, ne pas vous plaindre, vous rendre utile seul. Le problème, c'est l'organisation — pas vous.",
    biaisR:   "Vous avez posté un message de bienvenue, l'ordi était là, Thomas devait gérer. Si Mehdi a l'air perdu, votre premier réflexe n'est pas de remettre en cause l'onboarding.",
  },
  {
    title: 'Étape 5',
    sub:   "L'erreur de charte graphique",
    q:     'À qui revient la responsabilité de cette erreur ?',
    min:   'Entièrement à Mehdi',
    max:   "Entièrement à l'entreprise",
    biais:    'Malédiction de la connaissance',
    baisDef:  "Une fois qu'on sait quelque chose, on ne peut plus imaginer ne pas le savoir — et on oublie que les autres partent d'un état de connaissance différent.",
    biaisC:   "Vous avez utilisé le dossier 'Charte graphique' du drive partagé — le seul que vous connaissiez. Personne ne vous a dit qu'il en existait un autre. Comment auriez-vous pu savoir ?",
    biaisR:   "L'email de mise à jour avait été envoyé à toute l'équipe. Le drive était à jour. Pour vous, l'information était là — vous ne réalisez pas immédiatement que Mehdi n'existait pas encore dans l'entreprise à ce moment-là.",
  },
  {
    title: 'Étape 6',
    sub:   "Fin de période d'essai",
    q:     "Cette évaluation de fin de période d'essai vous semble-t-elle juste ?",
    min:   'Totalement injuste',
    max:   'Totalement juste',
    biais:    'Biais rétrospectif + ancrage',
    baisDef:  "Un événement marquant déforme le jugement global — et on réinterprète tout le passé à sa lumière, en croyant l'avoir 'su depuis le début'.",
    biaisC:   "On vous reproche un 'manque d'initiative' sans un seul exemple concret. Quand vous avez demandé lequel, on vous a dit 'vous auriez dû le sentir'. Comment être jugé sur des règles implicites que personne ne vous a données ?",
    biaisR:   "L'incident de la charte a ancré une image. En relisant 2 mois d'échanges, tout s'éclaire : jamais de proposition spontanée, jamais d'alerte proactive. Les doutes du début semblent confirmés — comme si c'était évident depuis le premier jour.",
  },
];


// ══════════════════════════════════════════════════
//  CONTEXTES SECRETS
//  CTX.c[i] = texte affiché au candidat à l'étape i
//  CTX.r[i] = texte affiché au recruteur à l'étape i
// ══════════════════════════════════════════════════

const CTX = {
  c: [
    // Étape 1 — CV
    "Ce CV, vous l'avez retravaillé pendant deux semaines. Le bénévolat chez Passerelle — 18 mois sans salaire — c'est l'expérience dont vous êtes le plus fier : audience triplée, articles de presse obtenus, site refait de zéro. Mais vous savez que le trou d'un mois va sauter aux yeux. Vous avez préparé une réponse. Vous espérez qu'on vous laisse l'expliquer.",
    // Étape 2 — Entretien
    "Chez Lumeo, votre manager vous rendait responsable de ses propres erreurs devant l'équipe. Après un an, vous avez démissionné — sans pouvoir le prouver, sans témoin. Vous ne pouvez pas dire ça dans un entretien. Alors vous dites 'raisons personnelles'. Sophie insiste. Chaque question supplémentaire vous ferme un peu plus : vous avez peur que la vérité se retourne contre vous.",
    // Étape 3 — Décision
    "Ce matin, vous avez reçu une autre offre — une grande agence internationale, 200€ de plus par mois. Vous avez choisi ComStudio parce que vous croyez au projet et voulez construire quelque chose de concret, pas juste exécuter. Le délai de 48h est court, mais la décision est mûrement réfléchie. Vous signez.",
    // Étape 4 — Premier jour
    "Thomas vous a dit d'attendre le point de 11h pour vos accès — vous ne voulez pas court-circuiter votre manager dès le premier matin. À 11h15, un message : réunion prolongée, point reporté à demain. Plus d'interlocuteur désigné. Vous déjeunez seul. L'après-midi, vous relisez le site, les réseaux sociaux, les campagnes récentes de ComStudio — vous prenez des notes, vous préparez des questions. À 18h, vous avez quatre pages de travail préparatoire et vous n'avez toujours pas eu accès à un seul outil de l'entreprise. Vous rangez vos affaires et rentrez chez vous.",
    // Étape 5 — Charte graphique
    "Vous avez passé trois jours sur ce visuel — votre premier grand livrable. Vous avez utilisé les fichiers du dossier 'Charte graphique' sur le drive partagé de l'équipe : c'est le seul dossier que vous connaissiez, le seul qu'on vous ait montré. Personne ne vous a signalé qu'une mise à jour avait eu lieu, ni qu'il existait une version plus récente.",
    // Étape 6 — Bilan
    "Thomas évoque un 'manque d'initiative'. Vous demandez un exemple concret. Il répond : 'vous auriez dû le sentir'. Vous repensez à vos deux mois : vous avez exécuté ce qu'on vous demandait, vous avez évité de déranger, vous avez fait confiance aux process. On vous reproche aujourd'hui de ne pas avoir deviné des règles implicites que personne ne vous a jamais expliquées.",
  ],
  r: [
    // Étape 1 — CV
    "Ce poste est ouvert depuis 4 mois. Le dernier profil similaire — avec un trou comparable dans le CV — est parti au bout de 3 semaines sans explication, laissant un client en pleine campagne sans interlocuteur. Depuis cet épisode, vous regardez ces périodes non renseignées différemment. La direction veut quelqu'un signé cette semaine.",
    // Étape 2 — Entretien
    "Votre grille d'évaluation interne est claire sur ce point : un candidat doit pouvoir nommer les raisons de son départ. Mehdi hésite, regarde ailleurs, tourne autour du pot. Vous avez encore 3 candidats en attente. Vous notez : 'non transparent sur les raisons de départ'. La vraie question n'est pas ce qu'il cache — c'est pourquoi il cache.",
    // Étape 3 — Décision
    "Votre N+1 a dit textuellement : 'on prend Mehdi ou on ferme le poste jusqu'en septembre'. Vous avez des réserves depuis l'entretien, mais vous n'avez pas le choix. Le contrat est signé le soir même — sans vérification de références, sans deuxième entretien. Vous essayez de vous convaincre que ça ira.",
    // Étape 4 — Premier jour
    "Vous êtes en comité de direction toute la matinée. Vous avez demandé à Thomas de prendre en charge l'arrivée de Mehdi — il a dit 'c'est bon'. Vous avez posté un message de bienvenue sur Slack à 9h02. En fin de journée, vous apprenez que Mehdi n'a pas eu accès à ses outils. Thomas pensait que les accès se créaient automatiquement à la signature du contrat.",
    // Étape 5 — Charte graphique
    "La fondation Espoir, c'est votre plus gros partenaire : 40 000€ de contrat annuel, renégocié dans trois semaines. L'email de mise à jour de la charte avait été envoyé à toute l'équipe le 15 janvier, avec la mention explicite 'merci d'archiver l'ancienne version'. Mehdi n'était pas encore là — mais le dossier drive avait bien été mis à jour ce jour-là. L'information était disponible.",
    // Étape 6 — Bilan
    "Vous avez relu deux mois d'échanges. Mehdi n'a jamais proposé une idée spontanément, jamais alerté sur un problème avant qu'il devienne urgent, jamais pris contact en dehors des réunions planifiées. Il exécutait bien ce qu'on lui demandait — mais pour un poste de chargé de communication, l'autonomie et la proactivité ne sont pas des bonus. Ce sont des attendus fondamentaux du poste.",
  ],
};


// ══════════════════════════════════════════════════
//  DOCUMENTS PROJETÉS
//  DOCS[i] = HTML du document affiché à l'étape i.
//  Les classes CSS sont définies dans index.html.
// ══════════════════════════════════════════════════

const DOCS = [

/* ── Étape 1 : CV ── */
`<div class="doc doc-paper">
  <div class="cv-header">
    <div class="cv-name">MEHDI ARIF</div>
    <div class="cv-title">Chargé de communication</div>
    <div class="cv-contact">mehdi.arif@email.com &nbsp;·&nbsp; 06 XX XX XX XX &nbsp;·&nbsp; Paris 75011</div>
  </div>
  <div class="cv-section">
    <div class="cv-section-title">Expériences professionnelles</div>
    <div class="cv-job">
      <div class="cv-job-top"><strong>Chargé de communication — Agence Lumeo, Paris</strong><span class="cv-date">Sept. 2020 – Nov. 2021 · 14 mois</span></div>
      <ul>
        <li>Gestion des réseaux sociaux (45 000 abonnés cumulés)</li>
        <li>Production de contenus print et digitaux</li>
        <li>Coordination avec les équipes créatives</li>
      </ul>
    </div>
    <div class="cv-gap">▸ Décembre 2021 — période de transition</div>
    <div class="cv-job">
      <div class="cv-job-top"><strong>Bénévole Communication — Association Passerelle, Paris</strong><span class="cv-date">Janv. 2022 – Juin 2023 · 18 mois</span></div>
      <ul>
        <li>Refonte du site web et des supports de communication</li>
        <li>Animation des réseaux sociaux (+200 % d'engagement)</li>
        <li>Relation presse : 3 articles obtenus</li>
      </ul>
    </div>
  </div>
  <div class="cv-section">
    <div class="cv-section-title">Formation</div>
    <p>Licence Information-Communication — Université Lyon 2</p>
    <p>Formation "Community Management" — OpenClassrooms (2022)</p>
  </div>
  <div class="cv-section">
    <div class="cv-section-title">Compétences</div>
    <p>Canva &nbsp;·&nbsp; Adobe Suite &nbsp;·&nbsp; Meta Business Suite &nbsp;·&nbsp; Notion &nbsp;·&nbsp; Mailchimp</p>
  </div>
</div>`,

/* ── Étape 2 : Extrait d'entretien ── */
`<div class="doc doc-paper">
  <div class="transcript-header">
    <span>🎙 EXTRAIT D'ENTRETIEN — Enregistrement RH nº2</span>
    <span>Durée : 3 min 12</span>
  </div>
  <div class="transcript-body">
    <div class="tline tline-rh"><span class="tspk">Sophie</span><span class="ttxt">Sur votre CV, entre novembre 2021 et janvier 2022, je vois une période qui n'est pas renseignée. C'était quoi, cette période ?</span></div>
    <div class="tline tline-c"><span class="tspk">Mehdi</span><span class="ttxt">Oui, tout à fait. J'ai quitté l'agence Lumeo fin novembre et j'ai pris un peu de temps pour moi avant de m'engager chez Passerelle. C'était une transition voulue.</span></div>
    <div class="tline tline-rh"><span class="tspk">Sophie</span><span class="ttxt">D'accord. Et ce départ de Lumeo, c'était dans quelles circonstances ?</span></div>
    <div class="tline tline-c"><span class="tspk">Mehdi</span><span class="ttxt">C'était... une décision personnelle. Le poste ne correspondait plus à ce que je cherchais, disons. J'avais envie de m'investir différemment.</span></div>
    <div class="tline tline-rh"><span class="tspk">Sophie</span><span class="ttxt">Est-ce que vous pouvez m'en dire un peu plus sur ce qui n'allait pas ?</span></div>
    <div class="tline tline-c"><span class="tspk">Mehdi</span><span class="ttxt"><em>[silence — 3 secondes]</em>&nbsp; Disons que l'environnement de travail n'était pas idéal pour moi. Mais j'en tire des apprentissages, et c'est ce qui m'a amené vers le bénévolat ensuite.</span></div>
    <div class="tline tline-rh"><span class="tspk">Sophie</span><span class="ttxt">Très bien. Et chez Passerelle, c'était une expérience enrichissante ?</span></div>
    <div class="tline tline-c"><span class="tspk">Mehdi</span><span class="ttxt">Vraiment, oui. C'est là où j'ai le plus progressé, en fait.</span></div>
  </div>
</div>`,

/* ── Étape 3 : Email d'offre ── */
`<div class="doc doc-paper">
  <div class="email-meta">
    <div class="email-row"><span class="email-lbl">De :</span><span>sophie.martin@comstudio.fr</span></div>
    <div class="email-row"><span class="email-lbl">À :</span><span>mehdi.arif@email.com</span></div>
    <div class="email-row"><span class="email-lbl">Objet :</span><strong>Offre de poste — Chargé de communication</strong></div>
    <div class="email-row"><span class="email-lbl">Date :</span><span>Mercredi 14 février, 17h43</span></div>
  </div>
  <div class="email-body">
    <p>Bonjour Mehdi,</p>
    <p>Suite à nos échanges, nous avons le plaisir de vous adresser une proposition formelle pour le poste de <strong>Chargé de communication</strong> au sein de ComStudio.</p>
    <div class="email-table">
      <div class="email-tr"><span>Contrat</span><span>CDI — temps plein</span></div>
      <div class="email-tr"><span>Rémunération</span><span>2 400 € brut / mois</span></div>
      <div class="email-tr"><span>Prise de poste</span><span>Lundi 4 mars</span></div>
      <div class="email-tr"><span>Période d'essai</span><span>2 mois renouvelable une fois</span></div>
    </div>
    <p>Nous vous remercions de bien vouloir nous confirmer votre accord <strong>avant vendredi 16 février, 12h00</strong>. Passé ce délai, nous serions contraints de nous tourner vers d'autres candidatures.</p>
    <p>Dans l'attente de votre retour,<br><strong>Sophie Martin</strong><br><em>Responsable Ressources Humaines — ComStudio</em></p>
  </div>
</div>`,

/* ── Étape 4 : Slack premier jour ── */
`<div class="doc" style="padding:0;overflow:hidden;max-width:660px;width:100%">
  <div class="slack-topbar">💬 Slack — #général — Lundi 4 mars</div>
  <div class="slack-body">
    <div class="slack-msg">
      <div class="slack-time">09:02</div>
      <div class="slack-content">
        <span class="slack-user">sophie.martin</span>
        <span class="slack-text">Bienvenue à Mehdi qui nous rejoint aujourd'hui en tant que chargé de com' ! 🎉</span>
        <span class="slack-react">👋 👋 🎉 😊</span>
      </div>
    </div>
    <div class="slack-msg">
      <div class="slack-time">09:48</div>
      <div class="slack-content">
        <span class="slack-user">thomas.rey <em class="slack-badge">Manager</em></span>
        <span class="slack-text">Mehdi, désolé je suis en réunion jusqu'à 11h. Tu peux t'installer au bureau 12, l'ordi est configuré. Les accès arrivent dans la journée. On se fait un point à 11h si t'as des questions !</span>
        <span class="slack-react">—</span>
      </div>
    </div>
    <div class="slack-msg">
      <div class="slack-time">12:31</div>
      <div class="slack-content">
        <span class="slack-user">thomas.rey <em class="slack-badge">Manager</em></span>
        <span class="slack-text">Finalement j'ai un déjeuner client, on reporte à demain matin 9h ?</span>
        <span class="slack-react">—</span>
      </div>
    </div>
    <div class="slack-msg slack-reply">
      <div class="slack-time">12:34</div>
      <div class="slack-content">
        <span class="slack-user">mehdi.arif</span>
        <span class="slack-text">Pas de souci, à demain ! 👍</span>
      </div>
    </div>
    <div class="slack-note">📷 &nbsp;Bureau 12, 09h17 — ordinateur éteint, badge posé sur le clavier</div>
  </div>
</div>`,

/* ── Étape 5 : Email réclamation charte ── */
`<div class="doc doc-paper">
  <div class="email-meta email-alert">
    <div class="email-row"><span class="email-lbl">De :</span><span>contact@fondation-espoir.org</span></div>
    <div class="email-row"><span class="email-lbl">À :</span><span>thomas.rey@comstudio.fr</span></div>
    <div class="email-row"><span class="email-lbl">Cc :</span><span>sophie.martin@comstudio.fr</span></div>
    <div class="email-row"><span class="email-lbl">Objet :</span><strong>⚠️ Envoi avec ancienne identité visuelle</strong></div>
    <div class="email-row"><span class="email-lbl">Date :</span><span>Jeudi 21 mars, 11h14</span></div>
  </div>
  <div class="email-body">
    <p>Bonjour Thomas,</p>
    <p>Nous avons bien reçu les éléments envoyés hier par votre collaborateur <strong>Mehdi Arif</strong> concernant notre prochaine campagne de communication.</p>
    <p>Cependant, nous constatons que les visuels transmis utilisent votre <strong>ancienne charte graphique</strong> (logo et couleurs pré-janvier 2024), alors que nous avions déjà intégré votre nouvelle identité dans nos propres documents de travail.</p>
    <p>Pourriez-vous nous faire parvenir une version corrigée rapidement ? Nous avons une réunion de validation interne <strong>vendredi matin</strong>.</p>
    <p>Merci de votre compréhension.<br><strong>Isabelle Fontaine</strong><br><em>Chargée de partenariats — Fondation Espoir</em></p>
    <div class="email-attach">📎 visuel_campagne_comstudio_v1.pdf &nbsp;<span style="color:#999;font-style:italic">— Logo version 2022 visible</span></div>
  </div>
</div>`,

/* ── Étape 6 : Évaluation fin de période d'essai ── */
`<div class="doc doc-paper">
  <div class="eval-top">
    <div class="eval-confid">CONFIDENTIEL</div>
    <div class="eval-title">Évaluation — Fin de période d'essai</div>
    <div class="eval-meta">Mehdi Arif &nbsp;·&nbsp; Chargé de communication &nbsp;·&nbsp; Manager : Thomas Rey &nbsp;·&nbsp; 3 mai</div>
  </div>
  <div class="eval-grid">
    <div class="eval-row eval-head"><span>Critère</span><span>Note</span><span>Commentaire</span></div>
    <div class="eval-row"><span>Qualité du travail</span><span class="estars">●●●●○</span><span>"Bonne exécution sur les tâches confiées"</span></div>
    <div class="eval-row"><span>Respect des délais</span><span class="estars">●●●●○</span><span>"Ponctuel et fiable"</span></div>
    <div class="eval-row"><span>Intégration équipe</span><span class="estars">●●●○○</span><span>"Apprécié mais reste discret"</span></div>
    <div class="eval-row"><span>Autonomie / Initiative</span><span class="estars elow">●●○○○</span><span>"Attend les consignes plutôt que de proposer"</span></div>
    <div class="eval-row"><span>Maîtrise des outils</span><span class="estars elow">●●○○○</span><span>"Quelques erreurs en début de poste"</span></div>
  </div>
  <div class="eval-comment">
    <div class="eval-comment-lbl">Appréciation générale — Thomas Rey</div>
    <p>"Mehdi est agréable et sérieux dans l'exécution. On note cependant un manque de proactivité qui nous interpelle pour un profil com'. On aurait aimé plus de prises d'initiative spontanées."</p>
  </div>
  <div class="eval-decision">
    <span>☐ Renouvellement confirmé</span>
    <span>☐ Période d'essai non renouvelée</span>
    <span class="eval-pending">☑ Décision en attente — point RH prévu</span>
  </div>
</div>`,

];


// ══════════════════════════════════════════════════
//  PORTRAITS PSYCHOLOGIQUES
//  Affichés à chaque participant avant le début du jeu.
//  INTRO.c = portrait du candidat (Mehdi)
//  INTRO.r = portrait du recruteur (Sophie)
// ══════════════════════════════════════════════════

const INTRO = {
  c: `<p>Mehdi a 27 ans. Il est compétent, consciencieux, et il le sait, mais il a appris à ne pas trop le montrer. Pendant 14 mois chez Lumeo, son manager lui attribuait ses propres erreurs devant l'équipe. Mehdi n'a jamais protesté car il ne voulait pas mal se faire voir et estimait que la bonne tenue des projets était le plus important.</p>
<p>14 mois plus tard, une ultime injustice fut la goutte d'eau, et il partit avant de craquer. Il est parti sans explication officielle. Fragilisé, il s'est investi dans une association locale pour reconstruire sa confiance en lui.</p>
<p>Il se sent à nouveau prêt à s'engager pleinement dans le monde du travail, et cherche un endroit où il ne risque plus de rencontrer le même type de situation toxique. Mais sa méfiance est désormais présente tout le temps, comme une protection.</p>`,

  r: `<p>Sophie a 38 ans. Responsable des ressources humaines, elle est rigoureuse, engagée dans son métier, attachée à protéger son équipe et aider la boîte.</p>
<p>Il y a quatre mois, elle a recruté quelqu'un dont le CV avait un trou. Elle l'avait remarqué. Les explications étaient vagues mais le candidat paraissait sincère et motivé, et elle l'avait recruté. Il faut dire qu'ils manquent de bons profils pour un tel poste. Ce collaborateur avait disparu trois semaines après son arrivée, laissant un client en pleine campagne sans interlocuteur. Elle a dû gérer une crise difficile.</p>
<p>Elle possède désormais un regard bien plus sévère sur le parcours des candidats.</p>`,
};
