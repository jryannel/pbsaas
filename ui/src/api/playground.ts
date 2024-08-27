import { PB_URL } from "./pb";

type EvalRequest = {
  content: string;
  language: string;
};

type EvalResponse = {
  result: string;
  error: string;
};

type TemplateRequest = {
  language: string;
};

type TemplateResponse = {
  template: string;
  error: string;
};

async function postRequest(url: string, body: unknown) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
}

export class Playground {
  static async evaluate(content: string, language: string): Promise<EvalResponse> {
    const body: EvalRequest = {
      content,
      language,
    };
    return postRequest(`${PB_URL}/playground/evaluate`, body);
  }

  static async fetchTemplate(language: string): Promise<TemplateResponse> {
    const body: TemplateRequest = {
      language,
    };
    return postRequest(`${PB_URL}/playground/template`, body);
  }
}


