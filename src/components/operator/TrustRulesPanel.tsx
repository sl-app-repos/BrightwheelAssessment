import { Card } from "@/components/ui/Card";
import { TRUST_RULES } from "@/lib/trustRules";

export function TrustRulesPanel() {
  return (
    <section>
      <h2 className="text-section-title mb-4 text-2xl">Trust Rules</h2>
      <Card className="bg-bw-panel/50 p-6">
        <ul className="space-y-4">
          {TRUST_RULES.map((rule) => (
            <li key={rule.title} className="text-[15px] leading-relaxed">
              <span className="font-semibold text-bw-primary">{rule.title}:</span>{" "}
              <span className="text-bw-body">{rule.description}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
