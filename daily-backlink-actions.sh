#!/bin/bash

# 🚀 Script d'Exécution Quotidienne - Backlinks
# Usage: ./daily-backlink-actions.sh

echo "🔥 PLAN D'ACTION BACKLINKS - $(date)"
echo "=================================="
echo

# Vérifier si on a déjà des résultats
if [ -f "backlink-progress.log" ]; then
    echo "📊 Progression Actuelle:"
    tail -5 backlink-progress.log
    echo
fi

echo "🎯 ACTIONS PRIORITAIRES AUJOURD'HUI:"
echo

echo "1. 📚 PROFILS ACADÉMIQUES (30-45 min chacun)"
echo "   🔗 ORCID: https://orcid.org/register"
echo "   🔗 Google Scholar: https://scholar.google.com/citations"
echo "   🔗 ResearchGate: https://www.researchgate.net/signup"
echo

echo "2. 💼 PROFILS PROFESSIONNELS (30 min chacun)"
echo "   🔗 LinkedIn: Mettre à jour Contact Info + About"
echo "   🔗 GitHub: Bio + README avec melissacolin.ai"
echo

echo "3. 🏢 CONTACT INSTITUTIONNEL"
echo "   📧 Email communication ENSEIRB-MATMECA"
echo "   📞 Contact professeurs pour mentions"
echo

echo "4. 📝 CONTENU (1-2h)"
echo "   ✍️  Article Dev.to sur parcours IA"
echo "   ✍️  Post LinkedIn avec lien portfolio"
echo

# Template d'email pour faciliter l'outreach
echo "📧 TEMPLATE EMAIL ENSEIRB:"
echo "=========================="
cat << 'EOF'
Objet: Portfolio étudiant IA - Mention possible ?

Bonjour,

Je suis Mélissa Colin, étudiante en Intelligence Artificielle à l'ENSEIRB-MATMECA.

J'ai récemment créé un portfolio professionnel (https://melissacolin.ai) 
présentant mes projets en vision par ordinateur et machine learning.

Serait-il possible de mentionner ce portfolio dans :
- La newsletter étudiante
- La page "Projets étudiants" du site
- Les réseaux sociaux de l'école

Je serais ravie de représenter l'excellence de notre formation !

Cordialement,
Mélissa Colin
EOF

echo
echo "🏃‍♀️ ACTIONS RAPIDES (10 min total):"
echo "   - Poster sur LinkedIn avec #ENSEIRB #IA"
echo "   - Mettre à jour bio Twitter avec lien portfolio"
echo "   - Commenter sur 2 posts LinkedIn IA avec signature"
echo

# Proposer de logger les actions
echo "📝 Voulez-vous logger une action accomplie ? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Quelle action avez-vous accomplie ?"
    read -r action
    echo "$(date): $action" >> backlink-progress.log
    echo "✅ Action loggée !"
fi

echo
echo "🎯 RAPPEL OBJECTIF: 20 backlinks en 30 jours"
echo "⏰ Temps recommandé aujourd'hui: 2-3 heures max"
echo "🚀 Commencez par ORCID et Google Scholar (impact maximum !)"
