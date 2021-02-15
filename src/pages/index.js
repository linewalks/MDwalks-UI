/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-one-expression-per-line */
/* Docusaurus 관련 파일로 tsx 변환 하지 않습니다. */
import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './styles.module.css'

const features = [
  {
    title: '정의서 작성 가이드라인을 따라가세요',
    description: (
      <>
        <Link to="/docs/basic/introduction">이쪽으로 &#x1f680; </Link>
      </>
    ),
  },
]

function Feature({ title, description }) {
  return (
    <div className={styles.feature}>
      <h2>{title}&#x1f64f;</h2>
      <div>{description}</div>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="MDwalks-UI 컴포넌트 정의서"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <h2 className="hero__subtitle">{siteConfig.tagline}</h2>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {
                  features.map((props, idx) => {
                    const key = `feature_${idx}`
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    return <Feature key={key} {...props} />
                  })
                }
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
