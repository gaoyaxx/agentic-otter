# Otter *REAL* Insights

*Please leave comments or reach out to [Ya Gao](mailto:ya.gao@cloudkitchens.com) if you have any questions.*

## Context

Restaurants today operate in increasingly complex environments: multiple sales channels, rising labor and supply costs, competitive pressure, and operational variability across locations. Leaders and operators rely on data to make decisions — yet the gap between seeing data and knowing what to do remains wide.

Otter Analytics already provides access to core data and reporting. But visibility alone is not enough. Our goal is to transform data into clarity, confidence, and action.

## Problem Statement

Otter Analytics offers reporting on sales, location/channel performance, menu, marketing and operational data. While these dashboards are useful for reference, they do not yet enable *fast, confident, aligned* decision-making across the restaurant organization.

Data is visible — but insight, explanation, prioritization, and action are still manual.

### Where the Current Experience Falls Short

1. Data shows what, not why  
   Trends are surfaced, but root cause drivers are not explained, requiring manual interpretation and guesswork.  
2. Answering a simple question requires multiple tools  
   Users must jump across dashboards, order histories, first party and OFO data, labor schedules, and marketing tools to understand performance changes.  
3. Not designed around roles or job-to-be-done  
   Different roles have distinct decision workflows, yet data is organized by dashboards instead of business needs, forcing users to translate insights themselves.  
4. Insights do not drive action

Even when issues are identified, the system does not:

1. Assess severity  
   2. Communicate business impact  
   3. Suggest next steps  
   4. Enable direct execution

**There is no smooth path from observation → diagnosis → decision → action.**

## Why now?

Over the past year, we focused heavily on improving data quality, reliability, and foundational reporting. This was necessary. Without accuracy and consistency, no customers will trust insights or automate decisions. That foundation work has meaningfully improved data integrity across channels and surfaces.

At the same time, we have seen strong signals that the next frontier is not more dashboards — it’s interpretation, prioritization, and action.

We have already explored this direction in several ways:

1. LV and Wenjie have already done some early explorations from a data-science perspective, including:  
   1. ‘[Insights GPT](https://data-apps.cssinternal.com/chaoqing.lu/insightgpt/),’ which generated periodic summaries of store-level performance and attempted to attribute what was driving sales changes;  
   2. Auto-generated in-depth [insights decks](https://docs.google.com/presentation/d/13AM-Z8wadUnzCu9shBDBmeD8dxvKgzwOJe8RRSHcDpg/edit?slide=id.home_page#slide=id.home_page) (example) that evaluated business performance across multiple angles;  
   3. Otter Assistant capability where users could ask data-related questions, and Otter Assistant would return the relevant metrics.  
2. Mark outlined several forward-looking directions and opportunities for what our Insights capability could become in his WIP [Otter SMB Product Strategy Brief](https://docs.google.com/document/d/1VtTJOHXZ8Ehr9eZWXijlOOkCW_AFN32RbOACMkL2E-c/edit?tab=t.0#heading=h.fgjqsx9coomq).  
3. In Q4, Emeric developed a dedicated vision for the [Menu insights](https://docs.google.com/presentation/d/1hGtkiOESzMGKcpzueT68JTx0h0HdcWx9g6Pc-kXZLmA/edit?slide=id.g2d6fc221354_0_34#slide=id.g2d6fc221354_0_34) domain.

We have the pieces.  
We’ve tested the appetite.  
We know where insight drives value.

**What’s missing is a unified, role-based, proactive decision intelligence system.**

And the timing is right:

1. Restaurants are experiencing margin pressure (labor, supply chain, channel fees). And operational complexity is increasing across channels, formats, brands, and platforms.

2. Competitors are shifting toward automation and intelligence-first operating systems. Toast just launched its AI Assistant [Toast IQ](https://pos.toasttab.com/products/toast-iq?source=tpos_acq_paidxxx_cousa_semgb_wmql_performmax_brand_q425_iq&utm_medium=paid&utm_source=semgb&utm_campaign=tpos-b2bsmb-paid--performmax_brand_q225imagery&utm_term=&_bt=&_bm=&_bn=x&gad_source=1&gad_campaignid=20993644033&gbraid=0AAAAAC7goOyGMdH2rB13F5BKhMqYGn8pq&gclid=Cj0KCQiA0KrJBhCOARIsAGIy9wCKU3iwTg09JnEPu3JcBGEideEiFPHKxzEZaxLxN8NEbG5Ksn_dYYgaApbpEALw_wcB).  
3. We have spent the last year making the data reliable. Now is the moment to make it useful.

## What Otter Insights Aims to Become

Otter Insights will be the **intelligence layer** across the restaurant business — continuously interpreting signals, identifying drivers, highlighting priorities, and guiding every role toward better, faster decisions.

**Otter doesn’t just show data.**  
**Otter tells the story — and recommends the move.**

## Who We Serve & The Decisions We Enable

Insights should be contextual and role-based, not one-size-fits-all.

| Roles | What Otter Insights Provides |
| :---- | :---- |
| Owners/Leadership | **Executive-level performance** narratives summarizing week-over-week and month-over-month changes. **Root-cause explanations** (e.g., “Traffic decline was primarily driven by slower prep times \+ poor rating trends”). **Forecasting** for revenue, labor, and cost to support strategic planning. Automatic detection of **systemic risks** (e.g., rising labor %, supply chain cost spikes). Portfolio-wide **benchmarking** across regions, channels, and store types. |
| Franchisee/Regional GM | **Multi-location comparison** with clear outlier flags. **Competitive benchmarking** (e.g., category performance in the area). Insights into **operational inefficiencies** (drive-thru delays, kitchen bottlenecks). Recommended **action plans** for underperforming locations. Automated alerts when a store deviates from expected patterns (prep times, voids, costs). Suggested **labor allocations**, scheduling adjustments, or promotions to recover trends. |
| Store GM | **Real-time operational alerts** (bottlenecks, prep time delays, long drive-thru waits). **Labor, cost, and staffing optimization insights. Menu performance insights** (low-margin, low-velocity, or complexity hotspots) and suggest menu optimizations (remove low-performing modifiers, adjust prep times). **Fraud risk detection** (refund/discount fraude, manager code leakage,cash skimming) **Recommended daily or shift-level actions**: “Reduce staffing by 1 person from 3–5 PM based on traffic patterns.” “Prep 20% more chicken ahead of Friday dinner rush based on forecast.” |
| Domain managers (POCs in Charge of Operations, Marketing, or Menus)) | These functional managers need deep-dive,  domain-specific insights |

## Productizing Otter Insights \- How Otter Insights Shows Up?

| Feature | Description | Surface/Medium |
| :---- | :---- | :---- |
| Personalized Weekly Insight Digest | Users can opt into a weekly digest that delivers the most meaningful insights for their business. They can fully tailor the content and choose their preferred delivery channels, while Otter provides smart and role-based defaults that automatically surface the insights most relevant to Owners, GMs, Operators, and Marketers. | Otter Go Email BM homepage |
| Otter (Insights) Assistant | Expand existing Support GPT to support more sophisticated insights related questions. And user can ask analytics/insignts related questions and get answers instantly | (Primary) Otter Go \- global permanent entry point BM dashboard \- Special entry point BM dashboard \- General Otter Assistant |
| Bite-sized,  Contextual Inline Insight Cards | Surface context-relevant insights exactly where the user is already working, with the goal of driving immediate, high-quality actions within the flow. Instead of sending users to a separate dashboard or report, inline insights connect data to the specific task or page they are viewing,ensuring that insights feel natural, timely, and actionable. | BM analytics dashboards BM other apps: menu, staff, marketing etc. |
| Personalized live alerts | Expand existing live alerts to support more real-time operations risks and fraud detections alerts. | Otter Go \- Push notification Otter Go \- Alerts page SMS Email BM \- Notification |

## Milestones — How Do We Get There?

| M0  Validation and Design Foundations  | \[User Research\] Deep-Dive Insights & Action Framework Conduct structured research with different roles  to understand what types of deep-dive insights, recommendations, and automations would be most valuable and actionable. \[Design Ready\] Insights Branding & Component System Establish a unified identity for Otter Insights and deliver all foundational UI components/widgets to support future surfaces (insight cards, summaries, alerts, etc.). | 2025 Q4  |
| :---- | :---- | :---- |
| **M1 MVP & First Surfaces**  | **\[Launch\]** Weekly descriptive insights summary in Otter Go **\[Design Exploration\]** Conversational UI in Otter Go **\[Launch\]** First version of menu-insights cards.  | 2026 Q1 |
| **M2 Intelligence Layer & Expanded Coverage** | **\[Launch\]** Otter Insights Assistant v1 (e.g., “help me analyze why sales changed”) on Otter Go and Business Manager. **\[Launch\]** Enhanced weekly insights (including competitor benchmarks and root-cause attribution).**\[Launch\]** Upgraded live alerts with fraud-detection insights. | 2026 Q2 |
| **M3** | TBD | Future |

## 

