import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import styles from './Article.module.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Article() {
    const params = useParams();
    const [article, setArticle] = useState(null);
    const id = Object.keys(params).length ? params.id : '972d2b8a';

    useEffect(() => {
        fetch(`https://midaiganes.irw.ee/api/list/${id}`)
            .then(res => res.json())
            .then(data => setArticle(data));
    }, [id]);
    
    const renderTags = () => {
        return article.tags.map(tag => {
            return <div key={tag} className={styles.tag}>{tag}</div>
        })
    }

    return (
        <div className={styles.wrapper}>
            {article ?
                <div>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className={styles.intro}>{parse(article.intro)}</div>
                    <div className={styles.imageWrapper}>
                        <img className={styles.mainImage} src={article.image.medium} alt={article.image.alt} />
                        <div className={styles.imageTitle}>{article.image.title}</div>
                        <div className={styles.imageBackgroundWrapper}>
                            <div className={styles.imageBackground} style={{backgroundImage: `url(${article.image.medium})`}}></div>
                        </div>
                    </div>
                    <div className={styles.body}>{parse(article.body)}</div>
                    <div className={styles.tags}>{renderTags()}</div>
                </div>
            : <LoadingSpinner />
            }
        </div>
    );
}

export default Article;