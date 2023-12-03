import * as React from "react";
import type { NextPage } from "next";
import { PageTypes } from "src/types/ResponsesInterface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Seo } from "@/components/SEO";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import { siteMetadata } from "@/utils/siteMetadata";
import Layout from "../components/Layout";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { i18n } from "next-i18next";
import { FormEvent } from "react";
import UIButton from "@/components/ui/UIButton";

const ContactPage: NextPage<{
  pages: PageTypes[];
}> = ({ pages }) => {
  const [page] = pages.filter((page) => page.attributes.slug === "contact");
  const { t } = useTranslation();

  // States for contact form fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //   Form validation state
  const [errors, setErrors] = useState({});

  //   Setting button text on form submission
  const [buttonText, setButtonText] = useState(i18n!.t("send"));

  // Setting success or failure messages states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  // Validation check method
  const handleValidation = (
    tempErrors: any = {},
    isValid: boolean = true
  ): boolean => {
    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   Handling form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText(i18n!.t("sending"));
      const res = await fetch("/api/form", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText(i18n!.t("send"));
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText(i18n!.t("send"));
    }
    console.log(fullname, email, subject, message);
  };

  return (
    <Layout>
      <Seo
        title={`${page.attributes.title}`}
        description={page.attributes.summary}
      />
      <section className="">
        <PageHeaderTitle
          title={page.attributes.title}
          description={page.attributes.summary}
        >
          {page.attributes.title}
        </PageHeaderTitle>
        <section
          className="layout relative bg-sec py-12 dark:bg-pri-darker"
          aria-labelledby="contact-heading"
        >
          <div className="">
            <div className="relative">
              <h2 id="contact-heading" className="sr-only">
                Contact us
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Contact information */}
                <div className="relative mr-0 space-y-3 overflow-hidden bg-gradient-to-b lg:mr-12">
                  <h3 className="text-lg font-medium">
                    {t("contactInformation")}
                  </h3>
                  <div className="max-w-3xl ">
                    <span className="font-bold">{siteMetadata.title}</span>
                    <br />
                    École de criminologie | Université de Montréal
                    {/* <br />
                    Pavillon Lionel-Groulx
                    <br />
                    3150, rue Jean-Brillant
                    <br />
                    Montreal, Canada
                    <br />
                    H3T 1N8 */}
                  </div>
                </div>

                {/* Contact form */}
                <div className="pt-6 lg:col-span-2 lg:ml-12 lg:pt-0">
                  {/* <h3 className=" text-lg font-medium">{t("getInTouch")}</h3> */}
                  <form
                    className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="fullname"
                        className=" block text-sm font-medium"
                      >
                        {t("name")}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="fullname"
                          id="fullname"
                          autoComplete="fullname"
                          onChange={(e) => {
                            setFullname(e.target.value);
                          }}
                          value={fullname}
                          className="border-warm-gray-300  focus:border-mblue-500 focus:ring-mblue-500 block w-full rounded-md px-4 py-3 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className=" block text-sm font-medium"
                      >
                        {t("email")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="border-warm-gray-300  focus:border-mblue-500 focus:ring-mblue-500 block w-full rounded-md px-4 py-3 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="subject"
                        className=" block text-sm font-medium"
                      >
                        {t("subject")}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          value={subject}
                          onChange={(e) => {
                            setSubject(e.target.value);
                          }}
                          className="border-warm-gray-300  focus:border-mblue-500 focus:ring-mblue-500 block w-full rounded-md px-4 py-3 shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-between">
                        <label
                          htmlFor="message"
                          className=" block text-sm font-medium"
                        >
                          Message
                        </label>
                        <span
                          id="message-max"
                          className="text-warm-gray-500 text-sm"
                        >
                          Max. 500 {t("characters")}
                        </span>
                      </div>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                          className="border-warm-gray-300  focus:border-mblue-500 focus:ring-mblue-500 block w-full rounded-md px-4 py-3 shadow-sm"
                          aria-describedby="message-max"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                      <UIButton type="submit" aria-label="submit">
                        {buttonText}
                      </UIButton>
                    </div>
                    <div className="text-left">
                      {showSuccessMessage && (
                        <p className="text-mblue-700 dark:text-mblue-500 my-2 text-sm font-semibold">
                          {t("messageSuccess")}
                        </p>
                      )}
                      {showFailureMessage && (
                        <p className="text-morange-700 dark:text-morange-500">
                          {t("messageFailure")}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default ContactPage;

export async function getStaticProps({ locale }: { locale: string }) {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesResponse.json();

  return {
    props: {
      pages: pages.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10,
  };
}
