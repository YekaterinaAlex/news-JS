import type { NewsResponse, SourcesResponse } from '../../types/news';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        const newsContainer = e.currentTarget;
        const target = e.target;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        if (!(target instanceof Element)) {
            return;
        }

        const sourceItem = target.closest<HTMLElement>('.source__item');

        if (!sourceItem || !newsContainer.contains(sourceItem)) {
            return;
        }

        const sourceId = sourceItem.getAttribute('data-source-id');

        if (!sourceId) {
            return;
        }

        if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);

            super.getResp<NewsResponse>(
                {
                    endpoint: 'everything',
                    options: {
                        sources: sourceId,
                    },
                },
                callback
            );
        }
    }
}

export default AppController;
