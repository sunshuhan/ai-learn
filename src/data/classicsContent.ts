export const CLASSICS_CONTENT = [
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need (2017)",
    author: "Ashish Vaswani et al. (Google Brain)",
    description: "Transformer 架构的开山之作，彻底改变了自然语言处理乃至整个 AI 领域的范式。",
    content: `
# Attention Is All You Need (注意力机制就是你需要的一切)

**作者**：Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin (2017)  
**论文链接**：[arXiv:1706.03762](https://arxiv.org/abs/1706.03762)

这是 AI 历史上最重要的论文之一。它提出了 **Transformer** 架构，直接催生了后来的 GPT、BERT、Gemini 等所有大语言模型。

## 1. 论文摘要 (Abstract) 原文节选

> "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. **We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.**"
> 
> "Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train."

**深度解读**：
在 Transformer 之前，处理语言（序列数据）的主流模型是 RNN（循环神经网络）和 LSTM。RNN 必须从左到右逐个词阅读，这导致训练速度极慢，无法利用现代 GPU 的强大并行算力。
这篇论文提出了一个极其大胆的想法：**完全抛弃 RNN 和 CNN，仅仅依赖“注意力机制（Attention Mechanism）”来处理序列。**

## 2. 核心机制：Scaled Dot-Product Attention

论文中最著名的公式，定义了自注意力机制的数学本质：

> "We call our particular attention 'Scaled Dot-Product Attention'. The input consists of queries and keys of dimension $d_k$, and values of dimension $d_v$. We compute the dot products of the query with all keys, divide each by $\\sqrt{d_k}$, and apply a softmax function to obtain the weights on the values."

$$
\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V
$$

**深度解读**：
- **Q (Query)**：当前词在寻找什么信息？
- **K (Key)**：其他词包含什么信息？
- **V (Value)**：其他词的实际内容。
除以 $\\sqrt{d_k}$ 是为了防止点乘结果过大导致 softmax 梯度消失，这是一个极其精妙的工程技巧。

## 3. 视频讲解推荐

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin-top: 24px; margin-bottom: 24px;">
  <iframe src="https://www.youtube.com/embed/iDulhoQ2pro" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="Attention Is All You Need Video"></iframe>
</div>

*注：以上为 Yannic Kilcher 对该论文的经典深度解析视频。*
    `
  },
  {
    id: "the-bitter-lesson",
    title: "The Bitter Lesson (苦涩的教训, 2019)",
    author: "Rich Sutton",
    description: "强化学习泰斗的深刻反思：为什么算力总是战胜人类精心设计的规则？",
    content: `
# The Bitter Lesson (苦涩的教训)

**作者**：Rich Sutton (强化学习领域的奠基人之一，2019年)  
**原文链接**：[The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)

这是一篇简短但极其震撼的博客文章。它不仅是对 AI 历史的总结，更是对未来 AI 发展方向的预言。这篇文章深刻影响了 OpenAI 等顶级机构的战略方向（即 Scaling Law）。

## 1. 核心观点原文节选

文章的开篇直接点明了主旨：

> "The biggest lesson that can be read from 70 years of AI research is that **general methods that leverage computation are ultimately the most effective**, and by a large margin. The ultimate reason for this is Moore's law, or rather its generalization of continued exponentially falling cost per unit of computation."

> "Most AI research has been conducted as if the computation available to the agent were constant (in which case leveraging human knowledge would be one of the only ways to improve performance) but, over a slightly longer time than a typical research project, massively more computation inevitably becomes available."

**深度解读**：
Sutton 指出，在过去 70 年的 AI 研究中，研究人员总是试图把自己对世界的**人类先验知识（Human Knowledge）**硬编码到 AI 系统中。他们假设算力是有限的，因此必须用人类的聪明才智来走捷径。
**然而，历史一次又一次地证明：这些基于人类聪明才智的“捷径”，在短期内可能有效，但在长期来看，总是会被“通用算法 + 大规模算力”无情地碾压。**

## 2. 历史的铁证

Sutton 在文中列举了多个领域的残酷现实：

> "In computer chess, the methods that defeated the world champion, Kasparov, in 1997, were based on massive, deep search. At the time, this was looked upon with dismay by the majority of computer-chess researchers who had pursued methods that leveraged human understanding of the special structure of chess."

> "A similar pattern of research progress was seen in computer Go, only delayed by 20 years. Enormous initial efforts went into avoiding search by taking advantage of human knowledge, or of the special features of the game... Once search was applied effectively at scale, with many computations, it immediately achieved superhuman performance."

## 3. 苦涩的结论

文章的结尾发人深省：

> "We have to learn the bitter lesson that building in how we think we think does not work in the long run. The bitter lesson is based on the historical observations that 1) AI researchers have often tried to build knowledge into their agents, 2) this always helps in the short term, and is personally satisfying to the researcher, but 3) in the long run it plateaus and even inhibits further progress, and 4) breakthrough progress eventually arrives by an opposing approach based on scaling computation by search and learning."

**“我们应该停止试图把人类的知识教给机器，而是应该让机器自己去发现知识。”** —— 这就是最苦涩，但也最伟大的教训。今天的大语言模型（LLM）正是这一教训的完美体现。
    `
  },
  {
    id: "spatial-intelligence",
    title: "Spatial Intelligence (空间智能, 2024)",
    author: "Fei-Fei Li (李飞飞)",
    description: "从 ImageNet 到空间智能，视觉 AI 的下一个十年：让 AI 在 3D 物理世界中行动。",
    content: `
# Spatial Intelligence (空间智能)：AI 的下一个圣杯

**作者**：Fei-Fei Li (李飞飞，斯坦福大学教授，ImageNet 缔造者，TED 2024)  
**演讲链接**：[TED: With spatial intelligence, AI will understand the real world](https://www.ted.com/talks/fei_fei_li_with_spatial_intelligence_ai_will_understand_the_real_world)

如果说大语言模型（LLM）让 AI 掌握了人类的语言，那么**空间智能（Spatial Intelligence）**将让 AI 真正进入并理解我们所处的物理世界。

## 1. 视觉进化的终极目的：行动 (Doing)

在 2024 年的 TED 演讲中，李飞飞教授深刻阐述了视觉的本质：

> "For the past 500 million years, vision has been the primary driving force of evolution... But nature didn't just create eyes to see. Nature created a virtuous cycle of seeing and doing, which we call **spatial intelligence**."

> "Spatial intelligence is how we understand the 3D world around us. It's how we navigate, how we manipulate objects, and how we interact with each other. It's the foundation of our physical existence."

**深度解读**：
生物视觉的进化不仅是为了“看”，更是为了“做”。
过去 10 年的 AI 视觉（如 ImageNet）解决了“感知（Seeing）”的问题，AI 学会了在一张 2D 图片中认出猫狗。但真正的智能需要“行动（Doing）”。当人类看到一个玻璃杯放在桌子边缘时，我们的大脑会瞬间进行物理模拟：*“它快掉下去了，如果掉下去会碎，我需要伸手去接住它。”* 这就是空间智能。

## 2. 空间智能的核心要素

李飞飞团队及前沿研究指出，空间智能要求 AI 具备以下能力：

1. **理解 3D 结构**：从 2D 像素中还原出 3D 的深度、遮挡关系和空间布局。
2. **理解物理法则**：知道重力、摩擦力、材质的脆弱性。
3. **预测未来（世界模型）**：在脑海（隐空间）中推演动作的后果。
4. **规划行动**：指挥机械臂或机器人身体去执行任务。

## 3. 迈向具身智能 (Embodied AI)

> "We are now at the dawn of a new era. We are moving from AI that can see and talk, to AI that can do. This is the era of Embodied AI."

目前的 AI（如 ChatGPT）是被困在赛博空间里的“缸中之脑”。它们可以写出优美的诗歌，却无法帮你把桌子上的咖啡杯端过来。
**空间智能是通往具身智能的必经之路。** 无论是 Sora 展现出的“世界模型”潜力，还是端到端自动驾驶、机器人大模型 (RT-X)，都在试图跨越这道鸿沟。

## 4. TED 演讲完整视频

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin-top: 24px; margin-bottom: 24px;">
  <iframe src="https://embed.ted.com/talks/fei_fei_li_with_spatial_intelligence_ai_will_understand_the_real_world" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="Fei-Fei Li TED Talk"></iframe>
</div>

*注：李飞飞教授在 TED 2024 大会上的精彩演讲，强烈建议观看完整版。*
    `
  }
];
