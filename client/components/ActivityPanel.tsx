'use client';

import { LogType } from "@/types/data";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect } from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

interface Props {
  activities: LogType[];
}

export default function ActivityPanel({ activities }: Props) {

  useEffect(() => {
    moment.locale("vi");
  }, [])

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h2 className="mb-4 font-semibold">🔔 Hoạt động</h2>

      <SimpleBar style={{ maxHeight: 400 }}>
        {activities.map((act) => (
          <motion.div
            key={act.id}
            whileHover={{ scale: 1.02 }}
            className="p-3 mb-2 rounded-lg border border-white/10 bg-[#111]"
          >
            <p className="text-sm">
              <span className="font-semibold text-blue-400">
                {act?.role_log?.value}
              </span>{" "}
              {act?.active} {act?.user?.username}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {moment(act?.createdAt).fromNow()}
            </p>
          </motion.div>
        ))}
      </SimpleBar>
    </div>
  );
}