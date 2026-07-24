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

  let markdown = `# Juan Timaná — Senior Full Stack & Systems Engineer

> Concise index & summary document. For full detailed documentation including comprehensive project writeups and complete work history, see [llms-full.txt](https://timana.net/llms-full.txt).

- **Location**: Lima, Perú
- **Email**: juan@timana.net
- **Phone / WhatsApp**: +51 989 953 522
- **Website**: https://timana.net
- **LinkedIn**: https://linkedin.com/in/juantimana
- **GitHub**: https://github.com/zietbukuel

---

## Profile Summary

Seasoned full-stack engineer with over a decade of experience building reliable web applications, managing backend logic (WordPress, Drupal, Laravel), and provisioning Linux server infrastructure (Debian/Ubuntu, LXC, Docker, CI/CD).

### Technical Toolkit
- Custom backend logic & framework development (WordPress, Drupal, Laravel, PHP, JavaScript, HTML, CSS)
- Advanced module, plugin, and theme engineering for WordPress and Drupal
- Server provisioning, Linux administration, and automated deployment pipelines
- Modern frontend development (React, Astro, TailwindCSS)

---

## Key Skills

`;

  skills.forEach((s) => {
    markdown += `- **${s.data.name}**: ${s.data.value}%\n`;
  });

  markdown += `\n---

## Work Experience Summary

`;

  employment.forEach((emp) => {
    markdown += `- **${emp.data.company}** — ${emp.data.role} (${emp.data.period})\n`;
  });

  markdown += `\n---

## Featured Portfolio Projects

`;

  projects.forEach((proj) => {
    const title = `${proj.data.part1} ${proj.data.part2}`;
    const categories = proj.data.categories
      .map((catId) => categoryMap.get(catId) || catId)
      .join(', ');

    markdown += `- **${title}** (${proj.data.subtitle})\n`;
    markdown += `  - **Category**: ${categories}\n`;
    markdown += `  - **Tech**: ${proj.data.tech || 'PHP, Web Engineering'}\n`;
    if (proj.data.url) {
      markdown += `  - **URL**: [${proj.data.urlText || 'See Live'}](${proj.data.url})\n`;
    }
  });

  markdown += `\n---

## Education & Certifications

`;

  education.forEach((edu) => {
    markdown += `- **${edu.data.school}**: ${edu.data.degree} in ${edu.data.field} (${edu.data.period})\n`;
  });

  markdown += `\n---

## Recognition & Speaking

`;

  recognition.forEach((rec) => {
    markdown += `- **${rec.data.title}** (${rec.data.role}, ${rec.data.location})\n`;
  });

  markdown += `\n---

## Client Testimonials

`;

  testimonials.forEach((t) => {
    const quote = t.body?.trim() || t.data.quote || '';
    const shortQuote = quote.length > 130 ? quote.slice(0, 127) + '...' : quote;
    markdown += `> "${shortQuote}" — **${t.data.author}**\n\n`;
  });

  markdown += `---

## Full Documentation Link

For full detailed documentation including comprehensive project writeups and work history, see [llms-full.txt](https://timana.net/llms-full.txt).
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
