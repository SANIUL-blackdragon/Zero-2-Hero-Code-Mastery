// JavaScript for HTML Master BITEZ Website
// This file should be saved as root/assets/JS/JS.js
// Define skill levels
const skillLevels = [
    { name: "HTML Novice", description: "Just starting your HTML journey" },
    { name: "Tag Initiate", description: "Learning and implementing basic HTML tags" },
    { name: "Structure Analyst", description: "Understanding and applying HTML elements" },
    { name: "Attribute Strategist", description: "Mastering attributes and their proper use" },
    { name: "Form Architect", description: "Building interactive forms with precision" },
    { name: "Markup Designer", description: "Structuring HTML semantically and logically" },
    { name: "Media Integrator", description: "Integrating audio, video, and other media content" },
    { name: "Layout Engineer", description: "Implementing advanced techniques and layouts" },
    { name: "Compliance Auditor", description: "Following coding standards and best practices" },
    { name: "Theory Master", description: "Full understanding of HTML concepts and inclusive design" },
    { name: "Practical Developer", description: "Demonstrates full, hands-on coding proficiency" },
    { name: "HTML Master", description: "Complete HTML proficiency across theory and practice" }
];
// User Progress Management System
const BITEZProgress = {
    // Initialize user progress if not exists
    initProgress: function() {
        if (!localStorage.getItem('htmlBitezProgress')) {
            const defaultProgress = {
                currentSection: 'introduction',
                completedSections: [], // Empty array - no sections completed initially
                sectionProgress: {
                    'introduction': 0, // Start at 0% instead of 100%
                    'basics': 0,
                    'elements': 0,
                    'attributes': 0,
                    'forms': 0,
                    'semantic': 0,
                    'multimedia': 0,
                    'advanced': 0,
                    'best-practices': 0,
                    'accessibility': 0,
                    'exercises': 0,
                    'reference': 0
                },
                exercisesCompleted: 0,
                lastVisit: new Date().toDateString(),
                streak: 0, // Start at 0 instead of 1
                achievements: []
            };
            localStorage.setItem('htmlBitezProgress', JSON.stringify(defaultProgress));
        }
        
        // Update all UI elements
        this.updateProgressDisplay();
        this.updateStats();
        this.updateAllSectionStatuses();
        this.updateLearningPath();
        this.updateCompleteButton();
    },
    
    // Get current progress data
    getProgress: function() {
        return JSON.parse(localStorage.getItem('htmlBitezProgress'));
    },
    
    // Save progress data
    saveProgress: function(progressData) {
        localStorage.setItem('htmlBitezProgress', JSON.stringify(progressData));
        this.updateProgressDisplay();
        this.updateStats();
    },
    
    // Update progress display
    updateProgressDisplay: function() {
        const progress = this.getProgress();
        const totalSections = Object.keys(progress.sectionProgress).length;
        const completedSections = progress.completedSections.length;
        const overallProgress = (completedSections / totalSections) * 100;
        
        // Update horizontal progress bar (if it exists)
        const progressFill = document.getElementById('main-progress');
        const progressTooltip = document.getElementById('progress-tooltip');
        
        if (progressFill) {
            progressFill.style.width = overallProgress + '%';
            // Add animation class for visual feedback
            progressFill.classList.add('updated');
            setTimeout(() => {
                progressFill.classList.remove('updated');
            }, 500);
        }
        
        if (progressTooltip) {
            // Calculate current skill level
            const currentLevelIndex = Math.min(Math.floor(completedSections), skillLevels.length - 1);
            const currentLevel = skillLevels[currentLevelIndex];
            
            progressTooltip.textContent = `${currentLevel.name} - ${Math.round(overallProgress)}%`;
            
            // Position tooltip at the end of progress bar
            progressTooltip.style.left = overallProgress + '%';
            progressTooltip.style.transform = 'translateX(-50%)';
        }
        
        // Update vertical progress bar and table
        const verticalProgressFill = document.getElementById('vertical-progress');
        
        if (verticalProgressFill) {
            verticalProgressFill.style.height = overallProgress + '%';
        }
        
        // Update skill level indicators
        const skillLevelElements = document.querySelectorAll('.skill-level');
        skillLevelElements.forEach((element, index) => {
            if (index <= currentLevelIndex) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
        
        // Update table rows
        const tableRows = document.querySelectorAll('.skill-level-table tbody tr');
        tableRows.forEach((row, index) => {
            // Remove all status classes
            row.classList.remove('active-row', 'completed-row');
            
            // Add appropriate class based on progress
            if (index < completedSections) {
                row.classList.add('completed-row');
            } else if (index === completedSections) {
                row.classList.add('active-row');
            }
        });
        
        // Setup hover effect for vertical progress bar
        this.setupVerticalProgressBarHover();
    },
    
    // Setup hover effect for vertical progress bar
    setupVerticalProgressBarHover: function() {
        const verticalProgressBar = document.getElementById('vertical-progress-bar');
        const enhancedTooltip = document.getElementById('enhanced-tooltip');
        const tooltipTitle = document.getElementById('tooltip-title');
        const tooltipDescription = document.getElementById('tooltip-description');
        const tooltipProgress = document.getElementById('tooltip-progress');
        
        if (verticalProgressBar && enhancedTooltip) {
            verticalProgressBar.addEventListener('mousemove', (e) => {
                const rect = verticalProgressBar.getBoundingClientRect();
                const y = e.clientY - rect.top;
                const percentage = (y / rect.height) * 100;
                
                // Calculate which level this corresponds to
                const levelIndex = Math.min(Math.floor(percentage / (100 / skillLevels.length)), skillLevels.length - 1);
                const level = skillLevels[levelIndex];
                
                // Update tooltip content
                tooltipTitle.textContent = level.name;
                tooltipDescription.textContent = level.description;
                tooltipProgress.textContent = `${Math.round(percentage)}%`;
                
                // Position tooltip at mouse position
                this.positionTooltip(e.clientX, e.clientY, enhancedTooltip);
                
                // Show tooltip
                enhancedTooltip.classList.add('active');
            });
            
            verticalProgressBar.addEventListener('mouseenter', () => {
                enhancedTooltip.classList.add('active');
            });
            
            verticalProgressBar.addEventListener('mouseleave', () => {
                enhancedTooltip.classList.remove('active');
            });
        }
    },
    
    // Position tooltip based on cursor position and viewport
    positionTooltip: function(x, y, tooltip) {
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const arrow = tooltip.querySelector('.tooltip-arrow');
        
        // Reset arrow classes
        arrow.className = 'tooltip-arrow';
        
        // Default position (right side)
        let left = x + 15;
        let top = y - (tooltipHeight / 2);
        
        // Adjust if tooltip goes off right edge
        if (left + tooltipWidth > windowWidth) {
            left = x - tooltipWidth - 15;
            arrow.classList.add('arrow-left');
        } else {
            arrow.classList.add('arrow-right');
        }
        
        // Adjust if tooltip goes off top edge
        if (top < 10) {
            top = 10;
        }
        
        // Adjust if tooltip goes off bottom edge
        if (top + tooltipHeight > windowHeight - 10) {
            top = windowHeight - tooltipHeight - 10;
        }
        
        // Apply position
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    },
    
    // Update stats display
    updateStats: function() {
        const progress = this.getProgress();
        
        const sectionsCompleted = document.getElementById('sections-completed');
        const exercisesDone = document.getElementById('exercises-done');
        const currentStreak = document.getElementById('current-streak');
        
        if (sectionsCompleted) {
            sectionsCompleted.textContent = progress.completedSections.length;
        }
        
        if (exercisesDone) {
            exercisesDone.textContent = progress.exercisesCompleted;
        }
        
        if (currentStreak) {
            currentStreak.textContent = progress.streak;
        }
    },
    
    // Update progress when section is viewed
    updateProgress: function(sectionId) {
        const progress = this.getProgress();
        
        // Update current section
        progress.currentSection = sectionId;
        
        // Mark section as viewed (10% progress for just viewing)
        if (progress.sectionProgress[sectionId] < 10) {
            progress.sectionProgress[sectionId] = 10;
        }
        
        // Check if section should be marked as completed
        if (!progress.completedSections.includes(sectionId) && progress.sectionProgress[sectionId] >= 100) {
            progress.completedSections.push(sectionId);
        }
        
        // Update streak if visiting on a new day
        const today = new Date().toDateString();
        if (progress.lastVisit !== today) {
            const lastVisit = new Date(progress.lastVisit);
            const todayDate = new Date(today);
            const diffTime = Math.abs(todayDate - lastVisit);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                progress.streak += 1;
            } else if (diffDays > 1) {
                progress.streak = 1; // Reset streak to 1 for returning after multiple days
            } else {
                progress.streak = 1; // First visit, set streak to 1
            }
            
            progress.lastVisit = today;
        }
        
        // Save updated progress
        this.saveProgress(progress);
        
        // Check for achievements
        this.checkForAchievements();
    },
    
    // Mark section as completed (can be called from exercises/quizzes)
    completeSection: function(sectionId) {
        const progress = this.getProgress();
        
        // Mark section as completed (100% progress)
        progress.sectionProgress[sectionId] = 100;
        
        // Add to completed sections if not already there
        if (!progress.completedSections.includes(sectionId)) {
            progress.completedSections.push(sectionId);
        }
        
        // Save updated progress
        this.saveProgress(progress);
        
        // Update UI elements
        this.updateSectionStatus(sectionId);
        this.updateLearningPath();
        this.updateCompleteButton();
        
        // Check for achievements
        this.checkForAchievements();
    },
    
    // Update section status UI
    updateSectionStatus: function(sectionId) {
        const statusElement = document.getElementById(sectionId + '-status');
        if (statusElement) {
            statusElement.innerHTML = '<i class="fas fa-check-circle complete"></i> Completed';
            statusElement.classList.add('completed');
        }
    },
    
    // Update learning path visualization
    updateLearningPath: function() {
        const progress = this.getProgress();
        const learningPath = document.getElementById('learning-path');
        
        if (!learningPath) return;
        
        // Clear existing path steps
        learningPath.innerHTML = '';
        
        // Get all section tabs
        const sectionTabs = document.querySelectorAll('.nav-tab');
        
        // Create path steps for each section
        sectionTabs.forEach((tab, index) => {
            const pathStep = document.createElement('div');
            pathStep.className = 'path-step';
            pathStep.textContent = index + 1;
            
            // Add appropriate class based on progress
            if (index < progress.completedSections.length) {
                pathStep.classList.add('completed');
            } else if (index === progress.completedSections.length) {
                pathStep.classList.add('active');
            }
            
            learningPath.appendChild(pathStep);
        });
    },
    
    // Update complete button state
    updateCompleteButton: function() {
        const completeBtn = document.getElementById('complete-section-btn');
        if (!completeBtn) return;
        
        const progress = this.getProgress();
        const currentSection = progress.currentSection;
        
        if (progress.completedSections.includes(currentSection)) {
            completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Section Completed!';
            completeBtn.disabled = true;
            completeBtn.classList.add('disabled');
        } else {
            completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Mark Introduction as Complete';
            completeBtn.disabled = false;
            completeBtn.classList.remove('disabled');
        }
    },
    
    // Update all section statuses on load
    updateAllSectionStatuses: function() {
        const progress = this.getProgress();
        
        // Update status for each completed section
        progress.completedSections.forEach(sectionId => {
            this.updateSectionStatus(sectionId);
        });
    },
    
    // Increment exercises completed count
    completeExercise: function() {
        const progress = this.getProgress();
        progress.exercisesCompleted += 1;
        this.saveProgress(progress);
        this.checkForAchievements();
    },
    
    // Check for achievements
    checkForAchievements: function() {
        const progress = this.getProgress();
        
        // First Steps achievement
        if (progress.completedSections.length >= 1 && !progress.achievements.includes('first-steps')) {
            this.addAchievement('first-steps', 'First Steps');
        }
        
        // Quick Learner achievement
        if (progress.completedSections.length >= 3 && !progress.achievements.includes('quick-learner')) {
            this.addAchievement('quick-learner', 'Quick Learner');
        }
        
        // Dedicated Student achievement
        if (progress.streak >= 3 && !progress.achievements.includes('dedicated-student')) {
            this.addAchievement('dedicated-student', 'Dedicated Student');
        }
        
        // Exercise Enthusiast achievement
        if (progress.exercisesCompleted >= 5 && !progress.achievements.includes('exercise-enthusiast')) {
            this.addAchievement('exercise-enthusiast', 'Exercise Enthusiast');
        }
        
        // Halfway There achievement
        if (progress.completedSections.length >= 6 && !progress.achievements.includes('halfway-there')) {
            this.addAchievement('halfway-there', 'Halfway There');
        }
        
        // HTML Master achievement
        if (progress.completedSections.length >= 12 && !progress.achievements.includes('html-master')) {
            this.addAchievement('html-master', 'HTML Master');
        }
    },
    
    // Add achievement
    addAchievement: function(achievementId, achievementName) {
        const progress = this.getProgress();
        if (!progress.achievements.includes(achievementId)) {
            progress.achievements.push(achievementId);
            this.saveProgress(progress);
            this.showAchievementNotification(achievementName);
        }
    },
    
    // Show achievement notification
    showAchievementNotification: function(achievementName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-text">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievementName}</div>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.getElementById('achievement-styles')) {
            const styles = document.createElement('style');
            styles.id = 'achievement-styles';
            styles.textContent = `
                .achievement-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    z-index: 1000;
                    animation: slideIn 0.5s ease-out;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .achievement-icon {
                    font-size: 2rem;
                    margin-right: 15px;
                }
                
                .achievement-text {
                    display: flex;
                    flex-direction: column;
                }
                
                .achievement-title {
                    font-weight: bold;
                    color: #333;
                }
                
                .achievement-name {
                    color: #666;
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 5000);
    },
    
    // Setup progress bar hover functionality
    setupProgressBarHover: function() {
        const progressContainers = document.querySelectorAll('.progress-container');
        
        progressContainers.forEach(container => {
            const progressBar = container.querySelector('.progress-bar');
            const tooltip = container.querySelector('.progress-tooltip');
            
            if (progressBar && tooltip) {
                progressBar.addEventListener('mousemove', (e) => {
                    const rect = progressBar.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    tooltip.style.left = x + 'px';
                });
            }
        });
    },
    
    // Reset progress (for testing or user request)
    resetProgress: function() {
        if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            localStorage.removeItem('htmlBitezProgress');
            this.initProgress();
        }
    },
    
    // Clear all localStorage data (for testing)
    clearAllData: function() {
        if (confirm('Are you sure you want to clear all data? This will reset everything and cannot be undone.')) {
            localStorage.clear();
            this.initProgress();
        }
    },
    
    // Debug function to log current progress
    debugProgress: function() {
        const progress = this.getProgress();
        console.log('Current Progress:', progress);
        return progress;
    }
};
// Tab navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Update progress
    BITEZProgress.updateProgress(sectionId);
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress tracking
    BITEZProgress.initProgress();
    
    // Setup progress bar hover functionality
    BITEZProgress.setupProgressBarHover();
    
    // Add debug functions to window for testing
    window.resetProgress = function() {
        BITEZProgress.resetProgress();
    };
    
    window.clearAllData = function() {
        BITEZProgress.clearAllData();
    };
    
    window.debugProgress = function() {
        return BITEZProgress.debugProgress();
    };
    
    // HTML Editor Preview
    if (document.getElementById('html-editor')) {
        updatePreview();
    }
    
    // Form Preview
    if (document.getElementById('form-editor')) {
        updateFormPreview();
    }
    
    // Semantic Preview
    if (document.getElementById('semantic-editor')) {
        updateSemanticPreview();
    }
    
    // Multimedia Preview
    if (document.getElementById('multimedia-editor')) {
        updateMultimediaPreview();
    }
    
    // Advanced Preview
    if (document.getElementById('advanced-editor')) {
        updateAdvancedPreview();
    }
    
    // Best Practices Preview
    if (document.getElementById('best-practices-editor')) {
        updateBestPracticesPreview();
    }
    
    // Accessibility Preview
    if (document.getElementById('accessibility-editor')) {
        updateAccessibilityPreview();
    }
    
    // Exercise Preview
    if (document.getElementById('exercise-editor')) {
        updateExercisePreview();
    }
    
    // Reference Search
    if (document.getElementById('reference-search')) {
        document.getElementById('reference-search').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const resultsDiv = document.getElementById('reference-results');
            
            if (searchTerm.length < 2) {
                resultsDiv.innerHTML = '<p>Start typing to search the HTML reference...</p>';
                return;
            }
            
            // Simple search implementation
            const searchData = [
                { term: 'div', description: 'Block-level container element', category: 'Basic Elements' },
                { term: 'span', description: 'Inline container element', category: 'Basic Elements' },
                { term: 'h1', description: 'Heading level 1', category: 'Text Elements' },
                { term: 'p', description: 'Paragraph element', category: 'Text Elements' },
                { term: 'a', description: 'Anchor/hyperlink element', category: 'Links' },
                { term: 'img', description: 'Image element', category: 'Media' },
                { term: 'form', description: 'Form container', category: 'Forms' },
                { term: 'input', description: 'Input element', category: 'Forms' },
                { term: 'button', description: 'Button element', category: 'Forms' },
                { term: 'table', description: 'Table element', category: 'Tables' },
                { term: 'ul', description: 'Unordered list', category: 'Lists' },
                { term: 'ol', description: 'Ordered list', category: 'Lists' },
                { term: 'li', description: 'List item', category: 'Lists' },
                { term: 'header', description: 'Header section', category: 'Semantic' },
                { term: 'nav', description: 'Navigation section', category: 'Semantic' },
                { term: 'main', description: 'Main content', category: 'Semantic' },
                { term: 'footer', description: 'Footer section', category: 'Semantic' },
                { term: 'section', description: 'Section element', category: 'Semantic' },
                { term: 'article', description: 'Article element', category: 'Semantic' },
                { term: 'aside', description: 'Aside content', category: 'Semantic' },
                { term: 'class', description: 'CSS class attribute', category: 'Attributes' },
                { term: 'id', description: 'Unique identifier attribute', category: 'Attributes' },
                { term: 'src', description: 'Source attribute', category: 'Attributes' },
                { term: 'alt', description: 'Alternative text attribute', category: 'Attributes' },
                { term: 'href', description: 'Hyperlink reference attribute', category: 'Attributes' },
                { term: 'onclick', description: 'Click event attribute', category: 'Events' },
                { term: 'onload', description: 'Load event attribute', category: 'Events' },
                { term: 'onsubmit', description: 'Submit event attribute', category: 'Events' }
            ];
            
            const results = searchData.filter(item => 
                item.term.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );
            
            if (results.length === 0) {
                resultsDiv.innerHTML = '<p>No results found. Try searching for HTML elements, attributes, or concepts.</p>';
                return;
            }
            
            let resultsHTML = '<h4>Search Results:</h4>';
            results.forEach(result => {
                resultsHTML += `
                    <div style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
                        <strong>${result.term}</strong> (${result.category})<br>
                        <em>${result.description}</em>
                    </div>
                `;
            });
            
            resultsDiv.innerHTML = resultsHTML;
        });
    }
});
// HTML Editor Preview
function updatePreview() {
    const htmlCode = document.getElementById('html-editor').value;
    const preview = document.getElementById('html-preview');
    preview.innerHTML = htmlCode;
}
// Form Preview
function updateFormPreview() {
    const formCode = document.getElementById('form-editor').value;
    const preview = document.getElementById('form-preview');
    preview.innerHTML = formCode;
}
// Semantic Preview
function updateSemanticPreview() {
    const semanticCode = document.getElementById('semantic-editor').value;
    const preview = document.getElementById('semantic-preview');
    preview.innerHTML = semanticCode;
}
// Multimedia Preview
function updateMultimediaPreview() {
    const multimediaCode = document.getElementById('multimedia-editor').value;
    const preview = document.getElementById('multimedia-preview');
    preview.innerHTML = multimediaCode;
}
// Advanced Preview
function updateAdvancedPreview() {
    const advancedCode = document.getElementById('advanced-editor').value;
    const preview = document.getElementById('advanced-preview');
    preview.innerHTML = advancedCode;
}
// Best Practices Preview
function updateBestPracticesPreview() {
    const bestPracticesCode = document.getElementById('best-practices-editor').value;
    const preview = document.getElementById('best-practices-preview');
    preview.innerHTML = bestPracticesCode;
}
// Accessibility Preview
function updateAccessibilityPreview() {
    const accessibilityCode = document.getElementById('accessibility-editor').value;
    const preview = document.getElementById('accessibility-preview');
    preview.innerHTML = accessibilityCode;
}
// Exercise Preview
function updateExercisePreview() {
    const exerciseCode = document.getElementById('exercise-editor').value;
    const preview = document.getElementById('exercise-preview');
    preview.innerHTML = exerciseCode;
}