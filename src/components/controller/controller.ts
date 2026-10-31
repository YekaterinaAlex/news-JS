import { NewsResponse, SourcesResponse } from '../../types/news';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: NewsResponse) => void) {
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        let target = e.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.closest<HTMLElement>('.source__item');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
