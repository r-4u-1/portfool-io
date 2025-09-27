import { Job } from "../TimeLine";

export type GetServicesResult = { jobs: Job[] } | { error: unknown };

export async function getServices(
  setErrorFunc?: (e: unknown) => void
): Promise<GetServicesResult> {
  try {
    let jobs: Job[];
    if (import.meta.env.DEV) {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Mock request failed");
      jobs = await res.json();
    } else {
      if (!res.ok) throw new Error(`Request failed with status ${res.status}: ${res.statusText}`);
      jobs = await res.json();
    }
    return { jobs };
  } catch (error) {
    if (setErrorFunc) setErrorFunc(error);
    return { error };
  }
}
