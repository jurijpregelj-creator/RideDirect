import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Privacy Policy — RideDirect" }

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#0D2A5E] mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: April 1, 2025</p>

          <Section title="1. Introduction">
            <p>This Privacy Policy explains how <strong>Orbito d.o.o.</strong> ("we", "us", "our"), the operator of RideDirect.eu, collects, uses, stores, and protects your personal data when you use our Platform.</p>
            <p>We process personal data in compliance with the <strong>General Data Protection Regulation (EU) 2016/679 ("GDPR")</strong> and applicable Slovenian data protection law.</p>
            <p><strong>Data Controller:</strong><br />Orbito d.o.o., Ložnica pri Žalcu 35K, 3310 Žalec, Slovenia<br />Email: <a href="mailto:info@ridedirect.eu" className="text-[#1E88E5]">info@ridedirect.eu</a></p>
          </Section>

          <Section title="2. Who This Policy Applies To">
            <p>This policy applies to all users of RideDirect.eu — including visitors who browse without an account and registered users who post listings or send messages. The Platform is intended for businesses and professionals; we do not knowingly collect data from individuals under 18.</p>
          </Section>

          <Section title="3. Data We Collect">
            <SubSection title="3.1 Account Data">
              <p>When you register: full name, business name, email address, country, and password (stored as a secure hash — never in plaintext).</p>
            </SubSection>
            <SubSection title="3.2 Listing Data">
              <p>When you post a listing: title, description, category, condition, year, price, location, and uploaded images.</p>
            </SubSection>
            <SubSection title="3.3 Messaging Data">
              <p>Messages sent through the Platform are stored along with sender/recipient identifiers and timestamps.</p>
            </SubSection>
            <SubSection title="3.4 Usage and Technical Data">
              <p>We automatically collect: IP address, browser type, pages visited, and device type. This is used for security and platform improvement. We do not build behavioral profiles for advertising.</p>
            </SubSection>
            <SubSection title="3.5 Contact Form Data">
              <p>Your name, email address, and message content if you contact us.</p>
            </SubSection>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Purpose</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Account management", "Performance of contract (Art. 6(1)(b))"],
                    ["Displaying listings", "Performance of contract (Art. 6(1)(b))"],
                    ["Messaging between users", "Performance of contract (Art. 6(1)(b))"],
                    ["Transactional emails", "Performance of contract (Art. 6(1)(b))"],
                    ["Security & fraud prevention", "Legitimate interests (Art. 6(1)(f))"],
                    ["Analytics & improvement", "Legitimate interests (Art. 6(1)(f))"],
                    ["Legal compliance", "Legal obligation (Art. 6(1)(c))"],
                    ["Marketing (if opted in)", "Consent (Art. 6(1)(a))"],
                  ].map(([purpose, basis]) => (
                    <tr key={purpose}>
                      <td className="p-3 text-gray-600">{purpose}</td>
                      <td className="p-3 text-gray-600">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="5. How We Use Your Data">
            <p>We use collected data to: manage your account, display listings, facilitate buyer-seller communications, send transactional emails, detect and prevent fraud, improve the Platform, respond to support requests, and comply with legal obligations.</p>
            <p>We do not sell your personal data to third parties. We do not use your data for automated individual decision-making or profiling that produces legal effects.</p>
          </Section>

          <Section title="6. Third-Party Services and Data Processors">
            <SubSection title="6.1 Supabase">
              <p>Used for database storage, authentication, and file storage. Data is stored in the EU region (AWS eu-central-1, Frankfurt). <a href="https://supabase.com/privacy" className="text-[#1E88E5] underline" target="_blank" rel="noopener noreferrer">Privacy policy →</a></p>
            </SubSection>
            <SubSection title="6.2 Vercel">
              <p>Used to host and serve the web application. Server request logs (including IP addresses) may be processed. <a href="https://vercel.com/legal/privacy-policy" className="text-[#1E88E5] underline" target="_blank" rel="noopener noreferrer">Privacy policy →</a></p>
            </SubSection>
            <SubSection title="6.3 Resend">
              <p>Used to deliver transactional emails. Your email address and automated email content are processed by Resend. <a href="https://resend.com/legal/privacy-policy" className="text-[#1E88E5] underline" target="_blank" rel="noopener noreferrer">Privacy policy →</a></p>
            </SubSection>
            <SubSection title="6.4 DeepL">
              <p>Used for optional message translation. Text submitted for translation is processed by DeepL SE (Germany, EU). <a href="https://www.deepl.com/en/privacy" className="text-[#1E88E5] underline" target="_blank" rel="noopener noreferrer">Privacy policy →</a></p>
            </SubSection>
          </Section>

          <Section title="7. Cookies">
            <p>We use cookies to operate and improve the Platform.</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Cookie</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Type</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-mono text-gray-600">sb-auth-token</td>
                    <td className="p-3 text-gray-600">Strictly necessary</td>
                    <td className="p-3 text-gray-600">Authentication session</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-gray-600">Analytics cookies</td>
                    <td className="p-3 text-gray-600">Analytics</td>
                    <td className="p-3 text-gray-600">Aggregate usage statistics</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">Strictly necessary cookies cannot be disabled. For non-essential cookies, we will ask for consent on first visit. You can manage cookies through your browser settings. We do not use cookies for advertising or cross-site tracking.</p>
          </Section>

          <Section title="8. Data Retention">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Data Type</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Account data", "Until deletion + 30 days for backup purge"],
                    ["Listings", "Until deleted by you or account termination"],
                    ["Messages", "2 years from last message in conversation"],
                    ["Server/access logs", "90 days"],
                    ["Contact form submissions", "1 year"],
                    ["Backup snapshots", "Up to 30 days rolling"],
                  ].map(([type, period]) => (
                    <tr key={type}>
                      <td className="p-3 text-gray-600">{type}</td>
                      <td className="p-3 text-gray-600">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="9. Your Rights Under GDPR">
            <p>As a data subject under the GDPR, you have the following rights:</p>
            <ul>
              <li><strong>Access (Art. 15):</strong> Request a copy of all personal data we hold about you.</li>
              <li><strong>Rectification (Art. 16):</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Erasure (Art. 17):</strong> Request deletion of your personal data.</li>
              <li><strong>Restriction (Art. 18):</strong> Request that we limit processing in certain circumstances.</li>
              <li><strong>Portability (Art. 20):</strong> Request your data in a machine-readable format.</li>
              <li><strong>Object (Art. 21):</strong> Object to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent:</strong> Where processing is consent-based, you may withdraw at any time.</li>
            </ul>
            <p>To exercise these rights, email <a href="mailto:info@ridedirect.eu" className="text-[#1E88E5]">info@ridedirect.eu</a>. We will respond within <strong>30 days</strong>.</p>
            <p>You may also lodge a complaint with the Slovenian Information Commissioner (<em>Informacijski pooblaščenec</em>): <a href="https://www.ip-rs.si" className="text-[#1E88E5] underline" target="_blank" rel="noopener noreferrer">ip-rs.si</a> · gp.ip@ip-rs.si</p>
          </Section>

          <Section title="10. International Data Transfers">
            <p>Some processors (Vercel, Resend) are based in the United States. Where data is transferred outside the EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission.</p>
          </Section>

          <Section title="11. Data Security">
            <p>We take technical and organizational measures to protect your data, including HTTPS/TLS encryption, hashed password storage, row-level database security, and access controls. In the event of a personal data breach, we will notify the relevant supervisory authority within 72 hours and affected users without undue delay, as required by GDPR Articles 33–34.</p>
          </Section>

          <Section title="12. Children's Data">
            <p>The Platform is intended for businesses and professionals. We do not knowingly collect personal data from individuals under 18. If we become aware that a minor has registered, we will promptly delete their account and data.</p>
          </Section>

          <Section title="13. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we make material changes, we will notify registered users by email or by posting a notice on the Platform. Continued use after the effective date constitutes acknowledgment of the updated policy.</p>
          </Section>

          <Section title="14. Contact">
            <address className="not-italic">
              <strong>Orbito d.o.o.</strong><br />
              Ložnica pri Žalcu 35K<br />
              3310 Žalec, Slovenia<br />
              Email: <a href="mailto:info@ridedirect.eu" className="text-[#1E88E5]">info@ridedirect.eu</a>
            </address>
          </Section>

          <div className="mt-10 pt-6 border-t border-gray-100 text-sm text-gray-400 flex gap-4">
            <Link href="/legal/terms" className="hover:text-[#1E88E5] transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-[#1E88E5] transition-colors">Back to RideDirect</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-[#0D2A5E] mb-3">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
      <div className="space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </div>
  )
}
