import Anthropic from "@anthropic-ai/sdk"

let client: Anthropic | null = null
function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null
  if (!client) client = new Anthropic({ apiKey })
  return client
}

export interface ListingForModeration {
  title: string
  description: string
  category: string
  country: string
  price: number
  currency: string
  manufacturer?: string | null
  condition?: string | null
}

export type ModerationVerdict =
  | { verdict: "approve" }
  | { verdict: "flag"; reason: string }

const SYSTEM_PROMPT = `You moderate new listings for RideDirect.eu, a European marketplace for amusement rides, arcade/redemption machines, and fairground and entertainment equipment (buyers and sellers are mostly businesses).

Approve listings that describe real equipment in that space at a plausible price, even if the copy is promotional/salesy — that's normal for this market.

Flag for human review anything that looks like: spam or fraud, prohibited or illegal items, attempts to redirect buyers off-platform (pushing WhatsApp numbers, external links, or emails instead of using the site's own contact form), incoherent or nonsensical text, a price wildly implausible for the stated item, or content unrelated to amusement/entertainment equipment. When genuinely unsure, flag rather than approve — a human reviews every flag, so a false flag just costs a manual look, while a false approve puts bad content live immediately.

Respond with ONLY a JSON object, no other text: {"verdict":"approve"} or {"verdict":"flag","reason":"<one short sentence, in English>"}.`

export async function classifyListing(listing: ListingForModeration): Promise<ModerationVerdict> {
  const anthropic = getClient()
  if (!anthropic) {
    return { verdict: "flag", reason: "AI moderation is not configured (missing ANTHROPIC_API_KEY) — review manually." }
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: JSON.stringify({
            title: listing.title,
            description: listing.description,
            category: listing.category,
            country: listing.country,
            price: listing.price,
            currency: listing.currency,
            manufacturer: listing.manufacturer || null,
            condition: listing.condition || null,
          }),
        },
      ],
    })

    const textBlock = message.content.find((block) => block.type === "text")
    const raw = textBlock && "text" in textBlock ? textBlock.text.trim() : ""
    const parsed = JSON.parse(raw)

    if (parsed?.verdict === "approve") return { verdict: "approve" }
    return {
      verdict: "flag",
      reason: typeof parsed?.reason === "string" ? parsed.reason : "Flagged by AI moderation.",
    }
  } catch (err) {
    console.error("[Moderation] Claude classification failed:", err)
    return { verdict: "flag", reason: "AI moderation failed — review manually." }
  }
}
