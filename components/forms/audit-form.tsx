"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Loader2,
  Trash2,
  Plus,
  ChevronDown,
} from "lucide-react";

import { generateInsights } from "@/lib/ai/generate-insights";
import { generateAudit } from "@/lib/audit/engine";
import { saveAudit } from "@/lib/db/save-audit";

import { useAuditStore } from "@/store/audit-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TOOL_OPTIONS } from "@/lib/config/tool-options";

type ToolInput = {
  toolName: string;
  customToolName?: string;
  plan: string;
  monthlyCost: number;
  seats: number;
};

type FormValues = {
  teamSize: number;
  primaryUseCase: string;
  tools: ToolInput[];
};

export function AuditForm() {
  const router = useRouter();

  const setResult =
    useAuditStore(
      (state) => state.setResult
    );

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      teamSize: 5,

      primaryUseCase: "coding",

      tools: [
        {
          toolName: "ChatGPT",

          plan: "Enterprise",

          monthlyCost: 300,

          seats: 5,
        },
      ],
    },
  });

  const tools = watch("tools");

  function addTool() {
    setValue("tools", [
      ...tools,
      {
        toolName: "",
        customToolName: "",
        plan: "",
        monthlyCost: 0,
        seats: 1,
      },
    ]);
  }

  function removeTool(
    index: number
  ) {
    setValue(
      "tools",
      tools.filter(
        (_, i) => i !== index
      )
    );
  }

  async function onSubmit(
    values: FormValues
  ) {
    try {
      setLoading(true);

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            1800
          )
      );

     const formattedTools =
  values.tools.map(
    (tool) => ({
      tool:
        tool.toolName ===
          "Other" &&
        tool.customToolName
          ? tool.customToolName
          : tool.toolName,

      plan: tool.plan,

      seats: tool.seats,

      monthlySpend:
        tool.monthlyCost *
        tool.seats,
    })
  );

      const result =
        generateAudit({
          teamSize:
            values.teamSize,

          primaryUseCase:
            values.primaryUseCase,

          tools:
            formattedTools,
        });

      const aiInsights =
        await generateInsights({
          teamSize:
            values.teamSize,

          primaryUseCase:
            values.primaryUseCase,

          tools:
            formattedTools.map(
              (tool) => ({
                toolName:
                  tool.tool,

                plan:
                  tool.plan,

                monthlyCost:
                  tool.monthlySpend,

                seats:
                  tool.seats,
              })
            ),
        });

      result.aiSummary =
        aiInsights;

      setResult(result);

      const savedAudit =
        await saveAudit({
          teamSize:
            values.teamSize,

          primaryUseCase:
            values.primaryUseCase,

          result,
        });

      if (
        savedAudit?.data?.[0]
          ?.id
      ) {
        router.push(
          "/audit/" +
            savedAudit.data[0]
              .id
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative mx-auto mt-20 max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-black/50 p-8 backdrop-blur-2xl"
    >
      <div className="absolute inset-0">
        <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
          AI Audit Engine
        </div>

        <h2 className="text-5xl font-semibold tracking-tight text-white">
          Audit Your AI Stack
        </h2>

        <p className="mt-4 max-w-2xl text-base text-white/60">
          Analyze your AI tooling spend
          and uncover savings
          opportunities instantly.
        </p>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="mt-10 space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Team Size"
              className="h-16 rounded-[24px] border border-white/10 bg-[#0b0b0f] px-5 text-lg font-medium text-white placeholder:text-white/30"
              {...register(
                "teamSize",
                {
                  valueAsNumber: true,
                }
              )}
            />

            <div className="relative">
              <select
                {...register(
                  "primaryUseCase"
                )}
                className="h-16 w-full appearance-none rounded-[24px] border border-white/10 bg-[#0b0b0f] px-5 pr-14 text-lg font-semibold text-white outline-none transition-all duration-200 focus:border-cyan-400"
              >
                <option value="coding">
                  Coding
                </option>

                <option value="marketing">
                  Marketing
                </option>

                <option value="design">
                  Design
                </option>

                <option value="sales">
                  Sales
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          <div className="space-y-5">
            {tools.map(
              (
                tool,
                index
              ) => (
                <div
                  key={index}
                  className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div className="grid gap-5 md:grid-cols-4">
                    {/* TOOL */}
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
{tools[index]?.toolName &&
tools[index]?.toolName !==
  "Other" ? (
    <Image
                  src={`/logos/${tools[index]?.toolName.toLowerCase()}.png`}
                  alt="logo"
                   width={22}
                    height={22}
                     className="object-contain"
                       />
                       ) : (
                        <span className="text-cyan-300">
      			    ⚡
  			  </span>
  			)}<div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
  	{tools[index]?.toolName &&
	tools[index]?.toolName !==
 	 "Other" ? (
  	  <Image
  	    src={`/logos/${tools[index]?.toolName.toLowerCase()}.png`}
       	    alt="logo"
  	    width={22}
            height={22}
            className="object-contain"
    />
  ) : (
    <span className="text-cyan-300">
      ⚡
    </span>
  )}
</div>
			</div>
                      </div>

                      <select
                        {...register(
                          `tools.${index}.toolName`
                        )}
                        className="h-16 w-full appearance-none rounded-[24px] border border-cyan-500/20 bg-[#0b0b0f] pl-16 pr-14 text-lg font-semibold text-white outline-none transition-all duration-200 focus:border-cyan-400"
                      >
                        <option value="">
                          Select Tool
                        </option>

                        {TOOL_OPTIONS.map(
                          (tool) => (
                            <option
                              key={
                                tool.name
                              }
                              value={
                                tool.name
                              }
                            >
                              {tool.name}
                            </option>
                          )
                        )}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                    </div>

                    {/* PLAN */}
                    {tools[index]
                      ?.toolName !==
                    "Other" ? (
                      <div className="relative">
                        <select
                          {...register(
                            `tools.${index}.plan`
                          )}
                          className="h-16 w-full appearance-none rounded-[24px] border border-white/10 bg-[#0b0b0f] px-5 pr-14 text-lg font-semibold text-white outline-none transition-all duration-200 focus:border-cyan-400"
                        >
                          <option
                            value=""
                            disabled
                            hidden
                          >
                            Select Plan
                          </option>

                          {(
                            TOOL_OPTIONS.find(
                              (t) =>
                                t.name ===
                                tools[index]
                                  ?.toolName
                            )?.plans ||
                            []
                          ).map(
                            (
                              plan
                            ) => (
                              <option
                                key={
                                  plan
                                }
                                value={
                                  plan
                                }
                              >
                                {plan}
                              </option>
                            )
                          )}
                        </select>

                        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                      </div>
                    ) : (
                      <Input
                        placeholder="Custom Plan"
                        className="h-16 rounded-[24px] border border-cyan-500/20 bg-[#0b0b0f] px-5 text-lg font-medium text-white placeholder:text-white/30"
                        {...register(
                          `tools.${index}.plan`
                        )}
                      />
                    )}

                    {/* COST */}
                    <div className="relative">
                      <div className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-lg font-medium text-white/30">
                        $
                      </div>

                      <Input
                        type="number"
                        placeholder="300"
                        className="h-16 rounded-[24px] border border-white/10 bg-[#0b0b0f] pl-10 text-lg font-medium text-white placeholder:text-white/30"
                        {...register(
                          `tools.${index}.monthlyCost`,
                          {
                            valueAsNumber: true,
                          }
                        )}
                      />
                    </div>

                    {/* SEATS */}
                    <Input
                      type="number"
                      placeholder="Seats"
                      className="h-16 rounded-[24px] border border-white/10 bg-[#0b0b0f] px-5 text-lg font-medium text-white placeholder:text-white/30"
                      {...register(
                        `tools.${index}.seats`,
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />

                    {/* CUSTOM TOOL */}
                    {tools[index]
                      ?.toolName ===
                      "Other" && (
                      <div className="md:col-span-4">
                        <Input
                          placeholder="Enter Custom Tool Name"
                          className="h-16 rounded-[24px] border border-cyan-500/20 bg-[#0b0b0f] px-5 text-lg font-medium text-white placeholder:text-white/30"
                          {...register(
                            `tools.${index}.customToolName`
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeTool(
                        index
                      )
                    }
                    className="mt-5 flex items-center gap-2 text-sm text-red-400 transition hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />

                    Remove Tool
                  </button>
                </div>
              )
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              type="button"
              onClick={addTool}
              className="h-14 rounded-3xl border border-white/10 bg-white/[0.04] px-6 text-white hover:bg-white/[0.08]"
            >
              <Plus className="mr-2 h-4 w-4" />

              Add Tool
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-14 rounded-3xl bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-500 px-8 text-white transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-4 w-4 animate-spin" />

                  Generating Audit...
                </div>
              ) : (
                "Generate Audit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}