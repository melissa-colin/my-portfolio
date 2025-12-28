#!/bin/bash

# 📧 Générateur d'Emails d'Outreach pour Backlinks
# Génère des templates personnalisés pour différents contacts

echo "📧 GÉNÉRATEUR D'EMAILS OUTREACH - $(date)"
echo "=========================================="
echo

# Menu de sélection
echo "Choisissez le type d'email à générer:"
echo "1. Communication ENSEIRB-MATMECA"
echo "2. Professeur/Encadrant"
echo "3. Association étudiante"
echo "4. Blog/Publication tech"
echo "5. Collaboration/Guest post"
echo "6. Répertoire étudiant"
echo

read -p "Entrez votre choix (1-6): " choice

case $choice in
1)
    echo
    echo "📧 EMAIL COMMUNICATION ENSEIRB-MATMECA"
    echo "======================================"
    cat << 'EOF'
OBJET: Portfolio étudiant IA - Mention possible sur site école ?

Bonjour,

Je suis Mélissa Colin, étudiante en 3ème année spécialité Intelligence Artificielle à l'ENSEIRB-MATMECA.

Dans le cadre de ma recherche de stage et future carrière, j'ai développé un portfolio professionnel présentant mes projets en vision par ordinateur et machine learning : https://melissacolin.ai

Ce portfolio met en valeur :
• Projets de détection d'objets (YOLO)
• Applications de traitement d'images
• Compétences techniques acquises à l'ENSEIRB
• Représentation positive de notre formation

Serait-il possible de mentionner ce portfolio dans :
- La newsletter étudiante mensuelle
- La section "Projets étudiants" du site web
- Les réseaux sociaux de l'école
- Les supports de communication externe

Je serais ravie de représenter l'excellence et l'innovation de notre formation en IA !

N'hésitez pas si vous avez besoin d'éléments complémentaires.

Cordialement,
Mélissa Colin
Étudiante IA - ENSEIRB-MATMECA
📧 melissa.colin@enseirb-matmeca.fr
🌐 https://melissacolin.ai
EOF
    ;;

2)
    echo
    echo "📧 EMAIL PROFESSEUR/ENCADRANT"
    echo "=============================="
    cat << 'EOF'
OBJET: Portfolio projets IA - Mélissa Colin

Bonjour [Nom du Professeur],

J'espère que vous allez bien. Je suis Mélissa Colin, étudiante dans votre cours [Nom du cours] cette année.

Je viens de finaliser mon portfolio professionnel qui présente notamment le projet que nous avons développé ensemble : https://melissacolin.ai

Ce portfolio inclut :
• [Nom du projet spécifique du cours]
• Résultats techniques obtenus
• Méthodologies apprises en cours
• Applications concrètes des concepts vus

Pensez-vous qu'il serait pertinent de :
- Mentionner ce portfolio comme exemple pour les futurs étudiants ?
- L'inclure dans les ressources du cours ?
- Le partager avec vos collègues travaillant sur des projets similaires ?

Je serais honorée de représenter la qualité de l'enseignement que vous dispensez.

Merci pour votre temps et vos précieux enseignements.

Cordialement,
Mélissa Colin
Étudiante IA - ENSEIRB-MATMECA
🌐 https://melissacolin.ai
EOF
    ;;

3)
    echo
    echo "📧 EMAIL ASSOCIATION ÉTUDIANTE"
    echo "=============================="
    cat << 'EOF'
OBJET: Portfolio IA - Inspiration pour autres étudiants ?

Salut l'équipe [Nom Association] !

Comment ça va ? Je suis Mélissa, étudiante en IA à l'ENSEIRB.

Je viens de terminer mon portfolio qui présente mes projets tech : https://melissacolin.ai

Je me disais que ça pourrait peut-être inspirer d'autres étudiants qui cherchent à :
• Créer leur propre portfolio
• Se démarquer pour les stages
• Présenter leurs projets techniques

Est-ce que vous pensez que ce serait cool de :
- Le partager sur vos réseaux sociaux ?
- L'inclure dans votre newsletter ?
- En parler lors des événements asso ?

Je peux aussi faire un petit tuto "Comment créer son portfolio" si ça vous dit !

Merci et à bientôt !

Mélissa 🚀
🌐 https://melissacolin.ai
EOF
    ;;

4)
    echo
    echo "📧 EMAIL BLOG/PUBLICATION TECH"
    echo "=============================="
    cat << 'EOF'
OBJET: Article invité - Parcours étudiant IA en France

Bonjour,

Je suis Mélissa Colin, étudiante en Intelligence Artificielle à l'ENSEIRB-MATMECA (Bordeaux).

Je suis une lectrice régulière de [Nom du blog] et j'apprécie particulièrement vos articles sur [sujet spécifique].

J'aimerais proposer un article invité sur le thème :
"Mon parcours d'étudiante en IA : de la théorie aux projets concrets"

Cet article pourrait couvrir :
• Formation française en IA (ENSEIRB perspective)
• Projets pratiques en vision par ordinateur
• Transition étudiante → professionnelle
• Conseils pour futurs étudiants IA

Mon portfolio (https://melissacolin.ai) présente mes réalisations techniques.

L'article serait original, informatif et apporterait une perspective étudiante unique à votre audience.

Seriez-vous intéressé par cette collaboration ?

Cordialement,
Mélissa Colin
🎓 Étudiante IA - ENSEIRB-MATMECA
🌐 https://melissacolin.ai
EOF
    ;;

5)
    echo
    echo "📧 EMAIL COLLABORATION/GUEST POST"
    echo "================================="
    cat << 'EOF'
OBJET: Collaboration contenu - Étudiante IA

Bonjour [Nom],

J'ai découvert votre travail sur [plateforme] et je suis impressionnée par [élément spécifique].

Je suis Mélissa Colin, étudiante en IA à l'ENSEIRB-MATMECA, et je développe du contenu autour de :
• Vision par ordinateur
• Machine learning appliqué
• Parcours étudiants en tech

Mon portfolio : https://melissacolin.ai

Je pense qu'il pourrait y avoir des synergies intéressantes entre nos contenus. Seriez-vous intéressé par :
- Un échange de guest posts ?
- Une collaboration sur un projet ?
- Un partage croisé de contenus ?

Je peux apporter une perspective étudiante/académique unique.

Qu'en pensez-vous ?

Mélissa 🤝
🌐 https://melissacolin.ai
EOF
    ;;

6)
    echo
    echo "📧 EMAIL RÉPERTOIRE ÉTUDIANT"
    echo "============================"
    cat << 'EOF'
OBJET: Ajout portfolio étudiant IA

Bonjour,

Je découvre votre répertoire de portfolios étudiants et je le trouve formidable !

Je suis Mélissa Colin, étudiante en Intelligence Artificielle à l'ENSEIRB-MATMECA (Bordeaux), et j'ai récemment finalisé mon portfolio : https://melissacolin.ai

Il présente mes projets en :
• Vision par ordinateur (YOLO, détection d'objets)
• Machine learning
• Développement web
• Formation française en IA

Pensez-vous qu'il pourrait avoir sa place dans votre répertoire ?

Cela pourrait inspirer d'autres étudiants français en IA !

Informations pour le répertoire :
- Nom : Mélissa Colin
- École : ENSEIRB-MATMECA
- Spécialité : Intelligence Artificielle
- URL : https://melissacolin.ai
- Technologies : Python, React, TensorFlow, YOLO

Merci pour ce super travail de curation !

Mélissa ✨
🌐 https://melissacolin.ai
EOF
    ;;

*)
    echo "Choix invalide. Relancez le script."
    exit 1
    ;;
esac

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 CHECKLIST AVANT ENVOI:"
echo "□ Personnaliser [Nom] et [éléments spécifiques]"
echo "□ Vérifier l'adresse email du destinataire"
echo "□ Adapter le ton selon le contexte"
echo "□ Inclure signature complète"
echo "□ Relire pour fautes d'orthographe"
echo
echo "💡 CONSEILS:"
echo "• Envoyer entre 10h-16h en semaine"
echo "• Follow-up après 1 semaine si pas de réponse"
echo "• Personnaliser chaque email"
echo "• Être authentique et professionnel"
echo
echo "📊 TRACKING:"
echo "Notez cet envoi dans votre tracker de progression !"
