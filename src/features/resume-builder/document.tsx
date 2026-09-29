import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

import type { ResumeData } from './schema'

// Static Lora files (WOFF1): react-pdf supports TTF and WOFF
Font.register({
  family: 'Lora',
  fonts: [
    { src: '/fonts/Lora-latin-400-normal.woff' },
    { src: '/fonts/Lora-latin-400-italic.woff', fontStyle: 'italic' },
    { src: '/fonts/Lora-latin-700-normal.woff', fontWeight: 700 },
    { src: '/fonts/Lora-latin-700-italic.woff', fontStyle: 'italic', fontWeight: 700 },
  ],
})

const SERIF = 'Lora'
const SANS = 'Helvetica'
const SANS_BOLD = 'Helvetica-Bold'

const BACKGROUND = '#ffffff'
const FOREGROUND = '#262626'
const PRIMARY = '#0f766e'
const MUTED = '#737373'
const BORDER = '#e5e5e5'

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 44,
    backgroundColor: BACKGROUND,
    fontFamily: SANS,
    fontSize: 10,
    lineHeight: 1.5,
    color: FOREGROUND,
  },
  name: {
    fontFamily: SERIF,
    fontWeight: 700,
    fontSize: 24,
    color: PRIMARY,
    textAlign: 'center',
    marginBottom: 2,
  },
  headline: {
    fontSize: 11,
    color: MUTED,
    textAlign: 'center',
    marginBottom: 6,
  },
  contact: {
    fontSize: 9,
    color: MUTED,
    textAlign: 'center',
    marginBottom: 12,
  },
  contactLink: {
    color: PRIMARY,
    textDecoration: 'none',
  },
  summary: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: SERIF,
    fontWeight: 700,
    fontSize: 13,
    color: PRIMARY,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 4,
    marginTop: 14,
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontFamily: SANS_BOLD,
    fontSize: 10.5,
  },
  entryMeta: {
    fontSize: 9,
    color: MUTED,
  },
  entrySub: {
    fontSize: 10,
    color: FOREGROUND,
    marginBottom: 2,
  },
  entrySubMuted: {
    color: MUTED,
  },
  skillsLine: {
    fontSize: 9,
    color: MUTED,
    marginBottom: 4,
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 2,
  },
  paragraph: {
    marginBottom: 4,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillCategory: {
    fontFamily: SANS_BOLD,
    width: 110,
  },
})

function formatDates(start: string, end: string, current: boolean): string {
  if (current) return `${start} – Present`
  if (end) return `${start} – ${end}`
  return start
}

function shortLinkLabel(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^mailto:/, '')
    .replace(/\/$/, '')
}

function ContactLine({ data }: { data: ResumeData }) {
  const parts: React.ReactNode[] = []
  const basics = data.basics

  if (basics.email) {
    parts.push(
      <Link key="email" src={`mailto:${basics.email}`} style={styles.contactLink}>
        {basics.email}
      </Link>,
    )
  }
  if (basics.location) {
    parts.push(<Text key="location">{basics.location}</Text>)
  }
  if (basics.linkedin) {
    parts.push(
      <Link key="linkedin" src={basics.linkedin} style={styles.contactLink}>
        {shortLinkLabel(basics.linkedin)}
      </Link>,
    )
  }
  if (basics.github) {
    parts.push(
      <Link key="github" src={basics.github} style={styles.contactLink}>
        {shortLinkLabel(basics.github)}
      </Link>,
    )
  }
  if (basics.websiteUrl) {
    parts.push(
      <Link key="website" src={basics.websiteUrl} style={styles.contactLink}>
        {basics.websiteLabel || shortLinkLabel(basics.websiteUrl)}
      </Link>,
    )
  }

  if (parts.length === 0) return null

  return (
    <Text style={styles.contact}>
      {parts.map((part, index) => (
        <Text key={index}>
          {index > 0 ? '  ·  ' : ''}
          {part}
        </Text>
      ))}
    </Text>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item, index) => (
          <Text key={index} style={styles.bullet}>
            • {item}
          </Text>
        ))}
    </>
  )
}

function SkillsLine({ items }: { items: string[] }) {
  const text = items
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' · ')
  if (!text) return null
  return <Text style={styles.skillsLine}>{text}</Text>
}

export function ResumeDocument({ data }: { data: ResumeData }) {
  return (
    <Document
      title={`${data.basics.name} – Resume`}
      author={data.basics.name}
      subject={data.basics.headline}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.basics.name}</Text>
        {data.basics.headline ? <Text style={styles.headline}>{data.basics.headline}</Text> : null}
        <ContactLine data={data} />

        {data.summary
          ? data.summary.split('\n\n').map((paragraph, index) => (
              <Text key={index} style={[styles.paragraph, styles.summary]}>
                {paragraph}
              </Text>
            ))
          : null}

        {data.experience.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((job) => (
              <View key={job.id} style={{ marginBottom: 8 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{job.role}</Text>
                  <Text style={styles.entryMeta}>
                    {formatDates(job.start, job.end, job.current)}
                  </Text>
                </View>
                {job.company || job.location ? (
                  <Text style={styles.entrySub}>
                    {job.company}
                    {job.company && job.location ? (
                      <Text style={styles.entrySubMuted}> · {job.location}</Text>
                    ) : null}
                    {!job.company && job.location ? job.location : null}
                  </Text>
                ) : null}
                <SkillsLine items={job.skills} />
                <Bullets items={job.bullets} />
              </View>
            ))}
          </View>
        ) : null}

        {data.projects.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={{ marginBottom: 8 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{project.name}</Text>
                  {project.link ? (
                    <Link src={project.link} style={[styles.entryMeta, styles.contactLink]}>
                      {shortLinkLabel(project.link)}
                    </Link>
                  ) : null}
                </View>
                <SkillsLine items={project.skills} />
                <Bullets items={project.bullets} />
              </View>
            ))}
          </View>
        ) : null}

        {data.skills.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((group) => (
              <View key={group.id} style={styles.skillRow}>
                <Text style={styles.skillCategory}>{group.category}</Text>
                <Text>
                  {group.items
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .join(', ')}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.education.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((entry) => (
              <View key={entry.id} style={{ marginBottom: 8 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{entry.school}</Text>
                  <Text style={styles.entryMeta}>{formatDates(entry.start, entry.end, false)}</Text>
                </View>
                {entry.degree || entry.location ? (
                  <Text style={styles.entrySub}>
                    {entry.degree}
                    {entry.degree && entry.location ? (
                      <Text style={styles.entrySubMuted}> · {entry.location}</Text>
                    ) : null}
                    {!entry.degree && entry.location ? entry.location : null}
                  </Text>
                ) : null}
                {entry.details ? <Text style={styles.paragraph}>{entry.details}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  )
}
