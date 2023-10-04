"use client";
import React, { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispBot() {
  useEffect(() => {
    Crisp.configure("c24819e3-9353-4eab-9262-baff72389577");
  }, []);

  return <></>;
}
