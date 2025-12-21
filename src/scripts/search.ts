export function initSearch() {
    const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
    const linkSections = document.querySelectorAll('.link-section');
    const linkCards = document.querySelectorAll('.link-card-item');
    const emptyState = document.getElementById('empty-state');

    // Force visible initially to prevent layout glitch
    linkCards.forEach(card => card.classList.remove('hidden'));

    let searchQuery = '';

    function filterLinks() {
        let hasVisibleLinks = false;
        const query = searchQuery;

        linkCards.forEach((card) => {
            const name = (card.getAttribute('data-name') || '').toLowerCase();
            const element = card as HTMLElement;
            const parentSection = element.closest('.link-section') as HTMLElement | null;

            // Match Logic - Search only (no category filter)
            const matchesSearch = name.includes(query);

            if (matchesSearch) {
                element.classList.remove('hidden');
                hasVisibleLinks = true;
                if (parentSection) {
                    parentSection.classList.remove('hidden');
                }
            } else {
                element.classList.add('hidden');
            }
        });

        // Check sections for emptiness - use classList instead of style.display
        linkSections.forEach(section => {
            const visibleCards = Array.from(section.querySelectorAll('.link-card-item:not(.hidden)'));

            if (visibleCards.length === 0) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        });

        // Toggle Empty State - pure classList
        if (!hasVisibleLinks && searchQuery) {
            emptyState?.classList.remove('hidden');
            emptyState?.classList.add('flex');
        } else {
            emptyState?.classList.add('hidden');
            emptyState?.classList.remove('flex');
        }
    }

    // Search Input Listener - filter links and manage wrapper state
    searchInput?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        searchQuery = target.value.trim().toLowerCase();
        filterLinks();

        // Update wrapper state based on search query
        const wrapper = document.getElementById('search-wrapper');
        if (searchQuery.length > 0) {
            wrapper?.classList.add('has-text');
        } else {
            wrapper?.classList.remove('has-text');
        }
    });

    // Note: Profile card animation is handled by CSS :focus-within
    // Keep hidden state when there's text on blur
    searchInput?.addEventListener('blur', () => {
        const wrapper = document.getElementById('search-wrapper');
        if (searchQuery.length > 0) {
            wrapper?.classList.add('has-text');
        } else {
            wrapper?.classList.remove('has-text');
        }
    });

    // Keyboard Shortcut (Cmd+K or Ctrl+K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput?.focus();
        }
    });

    // Initial filter run
    filterLinks();
}

// Auto-initialize
if (typeof window !== 'undefined') {
    // Client-side logic for search, category filtering, and animations
    document.addEventListener('astro:page-load', () => {
        initSearch();
    });

    // Also run on initial load in case view transitions aren't used or first load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
}
