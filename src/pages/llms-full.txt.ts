import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const projectCategories = await getCollection('projectCategories');
  const projects = await getCollection('projects');
  const education = await getCollection('education');
  const employment = await getCollection('employment');
  const testimonials = await getCollection('testimonials');
  const skills = await getCollection('skills');
  const recognition = await getCollection('recognition');

  // Sort items by order
  projects.sort((a, b) => a.data.order - b.data.order);
  education.sort((a, b) => a.data.order - b.data.order);
  employment.sort((a, b) => a.data.order - b.data.order);
  testimonials.sort((a, b) => a.data.order - b.data.order);
  skills.sort((a, b) => a.data.order - b.data.order);
  recognition.sort((a, b) => a.data.order - b.data.order);

  const categoryMap = new Map(projectCategories.map((c) => [c.data.id, c.data.label]));

  let markdown = `# Juan Timaná — Senior Full Stack & Systems Engineer (Full Documentation)

> Comprehensive full-text documentation. For the concise index version, see [llms.txt](https://timana.net/llms.txt).

- **Location**: Lima, Perú
- **Email**: juan@timana.net
- **Phone / WhatsApp**: +51 989 953 522
- **Website**: https://timana.net
- **LinkedIn**: https://linkedin.com/in/juantimana
- **GitHub**: https://github.com/zietbukuel

---

## About & Full Profile Summary

Welcome to my digital portfolio. I am a seasoned full-stack engineer with over a decade of experience building reliable web applications, managing backend logic, and structuring clean developer workflows.

My specialty is creating software solutions that don't just look good—they work hard for your business operations. With deep expertise across frameworks like WordPress, Drupal, and Laravel, I handle projects with a focus on stability and performance. Whether you need an optimized custom application layout from scratch, a secure API integration, or specialized functionality that off-the-shelf tools can't provide, I've got you covered.

What makes my approach different? I don't just write code—I solve business bottlenecks. Every application or system I build starts with understanding your specific infrastructure goals and scaling challenges. I pay special attention to security, WCAG accessibility compliance, and clean architecture so systems are built to grow alongside your business.

### Technical Toolkit
- Custom backend logic and framework development (WordPress, Drupal, Laravel, PHP, JavaScript, HTML, CSS)
- Advanced module, plugin, and theme engineering for WordPress and Drupal
- Server provisioning, environment orchestration (Debian/Ubuntu, LXC, Docker, S3 backups), and automated deployment pipelines
- Modern frontend development with clean, responsive layouts (React, Astro, TailwindCSS)

---

## Key Skills

`;

  skills.forEach((s) => {
    markdown += `- **${s.data.name}**: ${s.data.value}%\n`;
  });

  markdown += `\n---

## Work Experience (Detailed)

`;

  employment.forEach((emp) => {
    const desc = emp.body?.trim() || emp.data.description || '';
    markdown += `### ${emp.data.company}
- **Role**: ${emp.data.role}
- **Period**: ${emp.data.period}

${desc}

`;
  });

  markdown += `---

## Education & Certifications

`;

  education.forEach((edu) => {
    markdown += `- **${edu.data.school}**: ${edu.data.degree} in ${edu.data.field} (${edu.data.period})\n`;
  });

  markdown += `\n---

## Featured Portfolio Projects (Detailed Writeups)

`;

  projects.forEach((proj) => {
    const title = `${proj.data.part1} ${proj.data.part2}`;
    const categories = proj.data.categories
      .map((catId) => categoryMap.get(catId) || catId)
      .join(', ');

    markdown += `### ${title} — ${proj.data.subtitle}
- **Category**: ${categories}
- **Technologies**: ${proj.data.tech || 'PHP, Full Stack Web Engineering'}
`;
    if (proj.data.url) {
      markdown += `- **Live Link**: [${proj.data.urlText || 'See Live'}](${proj.data.url})\n`;
    }
    markdown += `\n${proj.data.desc}\n\n`;

    if (proj.body?.trim()) {
      markdown += `${proj.body.trim()}\n\n`;
    }
  });

  markdown += `---

## Recognition & Public Speaking

`;

  recognition.forEach((rec) => {
    const desc = rec.body?.trim() || rec.data.description || '';
    markdown += `### ${rec.data.title}
- **Role**: ${rec.data.role}
- **Location**: ${rec.data.location}

${desc}

`;
  });

  markdown += `---

## Client Testimonials (Full Quotes)

`;

  testimonials.forEach((t) => {
    const quote = t.body?.trim() || t.data.quote || '';
    markdown += `> "${quote}"
> 
> — **${t.data.author}**

`;
  });

  markdown += `---

## Quick Stats & Highlights
- **Happy Clients**: 30+
- **Projects Completed**: 40+
- **Interests**: Gamer & Car Enthusiast
- **Coffee Consumed**: 200+ cups
`;

  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(markdown);

  return new Response(utf8Bytes, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': utf8Bytes.byteLength.toString()
    }
  });
};
