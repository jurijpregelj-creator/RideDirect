import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Terms of Service — RideDirect" }

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#0D2A5E] mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: April 17, 2026</p>

          <Section title="1. Introduction">
            <p>These Terms of Service ("Terms") govern your access to and use of the RideDirect.eu platform ("Platform"), operated by <strong>Orbito d.o.o.</strong>, Ložnica pri Žalcu 35K, 3310 Žalec, Slovenia ("we", "us", "our").</p>
            <p>By registering an account or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.</p>
            <p>RideDirect.eu is a B2B marketplace that connects businesses and professionals looking to buy or sell amusement rides, fairground attractions, and related equipment. The Platform facilitates listings and initial contact between parties — it does not execute, broker, or guarantee any transaction.</p>
          </Section>

          <Section title="2. Eligibility">
            <p>The Platform is intended exclusively for businesses and professionals. By registering, you confirm that:</p>
            <ul>
              <li>You are acting in a professional or commercial capacity (not as a consumer);</li>
              <li>You are at least 18 years old;</li>
              <li>You are legally authorized to represent the business or entity on whose behalf you are registering;</li>
              <li>The information you provide during registration is accurate and up to date.</li>
            </ul>
            <p>We reserve the right to refuse or terminate access for any account that does not meet these criteria.</p>
          </Section>

          <Section title="3. Account Registration">
            <p>To post listings or contact sellers, you must create an account. You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your login credentials;</li>
              <li>All activity that occurs under your account;</li>
              <li>Notifying us immediately at info@ridedirect.eu if you suspect unauthorized access.</li>
            </ul>
            <p>You may not share, transfer, or sell your account to a third party.</p>
          </Section>

          <Section title="4. Listings">
            <SubSection title="4.1 Seller Responsibilities">
              <p>When posting a listing, you represent and warrant that:</p>
              <ul>
                <li>You are the legal owner of the item, or are authorized to sell it;</li>
                <li>All information provided (description, condition, price, location, photos) is accurate, complete, and not misleading;</li>
                <li>The item is not subject to any legal dispute, encumbrance, or export restriction that would prevent its sale;</li>
                <li>You will respond to legitimate inquiries in a timely and professional manner.</li>
              </ul>
            </SubSection>
            <SubSection title="4.2 Prohibited Listings">
              <p>You may not list:</p>
              <ul>
                <li>Items you do not own or are not authorized to sell;</li>
                <li>Stolen, counterfeit, or illegally obtained equipment;</li>
                <li>Items that do not constitute amusement rides or fairground attractions;</li>
                <li>Duplicate or spam listings for the same item;</li>
                <li>Items whose sale would violate applicable law or regulation.</li>
              </ul>
            </SubSection>
            <SubSection title="4.3 Listing Accuracy">
              <p>We reserve the right to edit, hide, or remove any listing that we determine, at our sole discretion, to be inaccurate, misleading, prohibited, or in violation of these Terms.</p>
            </SubSection>
            <SubSection title="4.4 No Guarantee of Sale">
              <p>Posting a listing does not guarantee that your item will sell, attract inquiries, or be viewed by any particular number of users.</p>
            </SubSection>
          </Section>

          <Section title="5. Transactions and No Liability for Deals">
            <p>RideDirect.eu is a listing and introduction platform only. We do not:</p>
            <ul>
              <li>Process payments or hold funds;</li>
              <li>Act as an agent, broker, or intermediary in any transaction;</li>
              <li>Inspect, verify, certify, or guarantee any item listed on the Platform;</li>
              <li>Guarantee that a listed item is safe, roadworthy, compliant with safety regulations, or fit for any particular purpose.</li>
            </ul>
            <p><strong>All transactions are entered into directly between buyer and seller.</strong> We are not a party to any agreement between users. Any dispute arising from a transaction is the sole responsibility of the parties involved.</p>
            <p>To the fullest extent permitted by applicable law, Orbito d.o.o. shall not be liable for any loss, damage, injury, or expense arising from or related to any transaction facilitated through the Platform.</p>
          </Section>

          <Section title="6. User Conduct">
            <p>You agree not to:</p>
            <ul>
              <li>Use the Platform for any unlawful purpose or in violation of these Terms;</li>
              <li>Post false, misleading, defamatory, or fraudulent content;</li>
              <li>Harass, threaten, or abuse other users;</li>
              <li>Scrape or systematically extract data from the Platform without prior written permission;</li>
              <li>Attempt to gain unauthorized access to any part of the Platform;</li>
              <li>Use the Platform to send unsolicited commercial messages (spam);</li>
              <li>Impersonate another person or entity.</li>
            </ul>
          </Section>

          <Section title="7. Messaging and Communications">
            <p>The messaging feature is provided to allow users to contact each other regarding listings. By using it, you agree to use it only for legitimate business inquiries and not to share personal data of third parties without their consent. We may review messages for safety and fraud prevention purposes.</p>
          </Section>

          <Section title="8. Intellectual Property">
            <SubSection title="8.1 Platform Content">
              <p>All content on the Platform that is not submitted by users — including the design, layout, code, graphics, trademarks, and text — is owned by Orbito d.o.o. or its licensors. You may not reproduce or redistribute this content without our prior written consent.</p>
            </SubSection>
            <SubSection title="8.2 User-Submitted Content">
              <p>By posting a listing or uploading content to the Platform, you grant Orbito d.o.o. a non-exclusive, worldwide, royalty-free license to display and distribute that content for the purpose of operating and promoting the Platform. You retain ownership of your content.</p>
            </SubSection>
          </Section>

          <Section title="9. Disclaimer of Warranties">
            <p>The Platform is provided "as is" and "as available" without warranty of any kind. We do not warrant that the Platform will be uninterrupted, error-free, or secure, or that any content will be accurate or complete.</p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>To the maximum extent permitted by applicable law, Orbito d.o.o. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total aggregate liability for any claim shall not exceed €100.</p>
            <p>Nothing in these Terms limits liability for fraud, gross negligence, or death or personal injury caused by our negligence.</p>
          </Section>

          <Section title="11. Account Termination">
            <SubSection title="11.1 By You">
              <p>You may close your account at any time by contacting us at info@ridedirect.eu.</p>
            </SubSection>
            <SubSection title="11.2 By Us">
              <p>We may suspend or terminate your account if you violate these Terms, if we suspect fraudulent or abusive activity, or if required by law.</p>
            </SubSection>
          </Section>

          <Section title="12. Changes to These Terms">
            <p>We may update these Terms from time to time. When we make material changes, we will notify registered users by email or by displaying a prominent notice on the Platform. Continued use after the effective date constitutes acceptance.</p>
          </Section>

          <Section title="13. Governing Law and Disputes">
            <p>These Terms are governed by the laws of the Republic of Slovenia. Disputes shall be subject to the exclusive jurisdiction of the competent courts in Žalec, Slovenia. You may also use the EU Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" className="text-[#1E88E5] underline" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.</p>
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
            <Link href="/legal/privacy" className="hover:text-[#1E88E5] transition-colors">Privacy Policy</Link>
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
