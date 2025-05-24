import { TypographyH1 } from "./TypographyH1";

export function Title({ title }: { title: string }) {
  return <TypographyH1 className="text-primary pb-8">{title}</TypographyH1>;
}
