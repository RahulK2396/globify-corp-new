interface LeadFormData {
  formName: string;
  fields: Record<string, string>;
}

export function extractFormFields(
  form: HTMLFormElement,
): Record<string, string> {
  const fields: Record<string, string> = {};
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const id = htmlEl.getAttribute("id");
    // Try to find a label element for this input
    const labelEl = id ? form.querySelector(`label[for="${id}"]`) : null;
    const labelText = labelEl?.textContent?.replace(/\s*\*\s*$/, "").trim();
    // Try label text, then placeholder, then id
    const placeholder = htmlEl
      .getAttribute("placeholder")
      ?.replace(/\s*\*\s*$/, "")
      .trim();
    const key = labelText || placeholder || id || htmlEl.tagName;
    fields[key] = (el as HTMLInputElement).value;
  });
  return fields;
}

export async function submitLeadForm({
  formName,
  fields,
}: LeadFormData): Promise<boolean> {
  try {
    const response = await fetch("/api/send-lead-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formName, fields }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Lead form submission error:", errorData);
      return false;
    }

    const data = await response.json();
    return data?.success === true;
  } catch (err) {
    console.error("Lead form submission error:", err);
    return false;
  }
}
