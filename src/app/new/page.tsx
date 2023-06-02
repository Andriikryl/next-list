import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }
  await prisma.todo.create({ data: { title, complete: false } });

  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center bg-orange-300 p-5 rounded-lg mb-2">
        <h1 className="text-5xl">New</h1>
      </header>
      <form
        className="p-6 bg-red-600 max-w-[600px] flex justify-center flex-col items-center gap-4 rounded-xl"
        action={createTodo}
      >
        <input
          type="text"
          name="title"
          className="border border-slate-100 bg-transparent rounded p-5 py-1 outline-none text-4xl max-w-[400px]"
        />
        <div className="flex gap-4">
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            href=".."
          >
            {" "}
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
