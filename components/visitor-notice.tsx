"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { firstVisitNotice, returnVisitNotice } from "@/lib/data";
import { readDeviceVisit, scheduleVisitAnalytics } from "@/lib/visitor";

const NOTICE_DELAY_MS = 300;

function noticeDuration(title: string, description: string) {
  const length = `${title} ${description}`.length;
  return Math.min(12_000, Math.max(3_000, 1_500 + 55 * length));
}

export default function VisitorNotice() {
  useEffect(() => {
    const visit = readDeviceVisit();
    if (!visit) return;

    const stopAnalytics = scheduleVisitAnalytics(visit);
    if (!visit.isNewVisit) return stopAnalytics;

    const notice =
      visit.visitCount > 1
        ? returnVisitNotice(visit.visitCount)
        : firstVisitNotice;
    const timer = window.setTimeout(() => {
      toast(
        <span className="block text-left">
          <span className="block font-medium">{notice.title}</span>
          <span className="block">{notice.description}</span>
        </span>,
        {
          duration: noticeDuration(notice.title, notice.description),
          ariaProps: { role: "status", "aria-live": "polite" },
        },
      );
    }, NOTICE_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      stopAnalytics();
    };
  }, []);

  return null;
}
