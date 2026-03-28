"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.06 }}
      className="group flex flex-col"
    >
      {/* Image */}
      <Link
        href={project.href}
        className="block overflow-hidden rounded-[20px] relative bg-border"
        style={{ aspectRatio: "1/1" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </Link>

      {/* Metadata */}
      <div className="mt-5 space-y-1.5">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-medium tracking-[0.05em] uppercase text-muted">
            {project.company} · {project.year} · {project.role}
          </p>
          <h2 className="text-[16px] font-medium text-foreground leading-snug">
            {project.title}
          </h2>
        </div>
        <p className="text-[13.5px] leading-[1.6] text-muted max-w-[90%]">
          {project.description}
        </p>
        <div className="pt-2">
          <Link
            href={project.href}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-foreground/50 transition-colors"
          >
            Case Study
            <ArrowUpRight size={13} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
