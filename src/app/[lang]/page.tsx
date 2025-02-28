import Link from "next/link";
import { useTranslation } from "@/i18n";
import { I12n } from "@/i18n/types";

interface Params {
  params: Promise<I12n>;
}

export default async function Home({ params }: Params) {
  const { lang } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang, "common");

  return (
    <div>
      <main>
        <h1>{t("welcome")}</h1>
        <Link href={`${lang}/about`}>{t("about")}</Link>
      </main>
    </div>
  );
}
