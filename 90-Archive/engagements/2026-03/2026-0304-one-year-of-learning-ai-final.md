# One Year of Learning AI: What Actually Changed

A year ago, I was typing prompts into ChatGPT and calling it an AI workflow. I'd paste in a document, ask a question, copy out the answer. It worked well enough — but I didn't realise how limited that setup was until someone showed me what was actually possible.

Twelve months later, I have an AI agent called Kinokomon running my [kinokoholic.com](https://kinokoholic.com) website through OpenClaw. I built a complex RAG system — the [Japan Tax Expert System](https://kinokoholic.com/projects/japanese-tax-expert-system-jtes-specialized-rag-for-professionals/) — that puts the entire corpus of Japanese tax and legal records at my fingertips. I'm directing Claude Code in the terminal to plan architecture with one model and implement with another, guided by markdown persona files that I had Claude draft for me.

A year ago, I wouldn't have believed I was capable of any of that.

What changed wasn't just my skills. The tools themselves evolved — fast. And the key insight? Once you set up a coding agent, *you* control how you use AI. Not the vendor.

Here's what actually shifted, and what you can do about each one today.

## 1. The tool shift: from ChatGPT to agents you control

My AI journey started where most people's did — with free models and prompt-driven development. I was using Google Colab, Replit, and ChatGPT's free tier, cobbling things together by pasting prompts and hoping the output held up. During that phase, I was also figuring out my development environment, trying PyCharm before eventually settling on VS Code.

The turning point was a colleague named Frank.

Frank was an accomplished developer who took pity on my meager attempts to build an automated receipt classification system. He connected to my GitHub repository, then proceeded to prompt his CLI agents — Codex and Claude Code — and built the whole system in about an hour.

"Here, I stick your requirements in then ask a couple questions to get the bots warmed up, prime the context," he said. Then: "This one, I tell it to document the entire plan and architecture. The other one has to check his work and eliminate ambiguity. Whenever they code, it's all based on TDD and BDD. Just stick the skill here and tell them to use it."

I subscribed to Claude that week. The impact on my own project — the Japan Tax Expert System — was immediate. Tasks that had taken me hours of prompt-wrangling in free tools were handled cleanly by Claude Code in minutes. Not because the AI was magically smarter, but because I could finally direct it properly: in the terminal, inside my actual project, with full context about what I was building.

The real shift isn't from one product to another. It's from asking "What can this tool do?" to "What do I want to build?"

**Do this today:** List three tasks you do every week. Which would benefit from a custom workflow rather than a generic chat window? For each one, sketch what an agent would need: what goes in, what comes out, what tools it touches, and where it should stop.

## 2. The data shift: from vendor lock-in to owning your context

After months of using ChatGPT, I realised my most valuable asset — the context I'd built up through hundreds of conversations — was locked inside someone else's platform. Every refined prompt, every workflow I'd figured out, every template that actually worked — all of it lived in a vendor's database. Switch tools, and it's gone.

This is the same vendor lock-in problem we deal with in enterprise IT, just at a personal scale. And the solution is the same: own your data.

I started building a local knowledge vault — a folder structure with markdown files containing my best prompts, SOPs, reference material, and project context. Nothing fancy, but transformative. When I moved from ChatGPT to Claude, my context came with me. When I experiment with local models through Ollama, or use Zhipu AI's GLM for specific tasks, the same context files apply. When I set up Kinokomon — my OpenClaw agent — it had a ready-made library of skills and knowledge to draw from on day one.

Your accumulated context is your competitive advantage. Don't let a vendor own it.

**Do this today:** Export your ChatGPT history (Settings → Data Controls → Export). Create a local folder — your AI vault. Start saving your best prompts, templates, and instructions there as markdown files. When you switch tools — and you will — your context travels with you.

## 3. The skill shift: from prompting to delegation

Early on, getting good at AI meant getting good at prompting. Crafting the perfect instruction. Adding constraints. Tweaking wording until the output was usable.

That still matters, but the bigger skill shift is from *prompting* to *delegation*. A prompt is a one-off instruction. Delegation means defining a repeatable task — with clear inputs, expected outputs, and success criteria — that an agent can run reliably without you hovering over every response.

Remember what Frank showed me? "Just stick the skill here and tell them to use it." That was the breakthrough. I started setting up markdown-based persona files — simple documents that instruct agents on how to behave for specific types of work. Here's the trick: I didn't write those persona files from scratch. I asked Claude to draft them. Telling a model to create the prompt that will instruct itself is one of the best ways to get high-quality results — the model knows what it needs to perform well, often better than you do. That small insight changed everything. One persona for planning (using a more capable, expensive model to map out milestones and issues), another for implementation (using a cheaper, faster model to write the actual code). Each persona knows its role, its constraints, and what "done" looks like.

It's project management, applied to AI. You don't write detailed instructions from scratch every time you hand someone a task. You create an SOP, brief them, and let them execute. The better your SOPs, the less you intervene.

**Do this today:** Take one task you regularly use AI for. Write it up as a skill document: what inputs does it need, what should the output look like, and how do you know it succeeded? Save it as a markdown file. Test it. Refine it. That document is now reusable across any AI tool.

## 4. The integration shift: from isolated chats to connected workflows

For most of last year, AI was a standalone thing for me. Open a chat, paste something in, get a response, copy it out. Every interaction was isolated from my actual working environment.

Everything changed when I started prompting inside the IDE. With Claude Code running in the terminal alongside VS Code, I could direct the agent within the context of my actual project — its files, its structure, its history. Instead of describing my codebase to an AI in a separate browser tab, the agent could see it directly.

This opened up a workflow I hadn't anticipated: using an expensive model to plan out milestones and break down issues, then handing the implementation to a cheaper, faster agent. The planning agent thinks strategically; the coding agent executes efficiently. Connected through the same project context, guided by persona files.

The latest evolution is OpenClaw. Kinokomon — my personalised OpenClaw agent — now manages my kinokoholic.com website. It's an AI agent with its own identity, its own skills, and a persistent connection to my tools and data. You can see [everything Kinokomon does](https://kinokoholic.com/kinokomon/) — it's a transparency I couldn't have imagined a year ago.

**Do this today:** Pick two tools you use daily. How does information currently move between them — copy-paste? Manual re-entry? Could an AI agent sit in the middle, pulling from one and pushing to the other? Start with the simplest possible connection.

## 5. The trust shift: from blind automation to guardrails by design

Early on, I made the mistake a lot of people make. If the AI output looked polished and confident, I assumed it was correct. With the Japan Tax Expert System — where the source material is Japanese tax law — that assumption could have real consequences. Bad tax guidance isn't just unhelpful. It's dangerous.

The more I used AI agents, the more I learned to think in terms of blast radius. If this agent makes a mistake, what's the worst that happens? Can it modify production files? Can it give someone incorrect legal information? Can it publish something I haven't reviewed?

This is where Frank's TDD and BDD approach proved its worth. Tests aren't just a coding best practice — they're guardrails. The best workflows have humans in the loop at the high-stakes moments and automation handling everything else. For my RAG system, the AI retrieves and synthesises, but a human always validates the output before it reaches anyone relying on it. The guardrails aren't an afterthought — they're the architecture.

**Do this today:** Pick one AI workflow you rely on. Define the blast radius: what's the worst realistic outcome if it fails or hallucinates? Then add one constraint — a human approval step, a scope limit, a validation check. Build trust incrementally, not blindly.

## Start with one

If this feels like a lot, that's normal. A year ago, I was copying and pasting between ChatGPT's free tier and Google Colab, calling it AI development. You don't need to do everything at once.

Pick one shift. Whichever resonated most.

Export your data. Write one SOP. Sketch one workflow. Define one guardrail.

The tools are going to keep changing — that's the one certainty after this year. But your context, your workflows, and your understanding of how to direct AI? That compounds. And no vendor can take it from you.
