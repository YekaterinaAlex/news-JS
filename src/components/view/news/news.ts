import './news.css';

import type { Article } from '../../../types/news';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector('.news__item');

            if (newsItem && idx % 2 !== 0) {
                newsItem.classList.add('alt');
            }

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');

            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            const author = newsClone.querySelector('.news__meta-author');

            if (author) {
                author.textContent = item.author || item.source.name;
            }
            const date = newsClone.querySelector('.news__meta-date');

            if (date) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }
            const title = newsClone.querySelector('.news__description-title');

            if (title) {
                title.textContent = item.title;
            }

            const source = newsClone.querySelector('.news__description-source');

            if (source) {
                source.textContent = item.source.name;
            }

            const description = newsClone.querySelector('.news__description-content');

            if (description) {
                description.textContent = item.description ?? '';
            }
            const link = newsClone.querySelector('.news__read-more a');

            if (link) {
                link.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');

        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
