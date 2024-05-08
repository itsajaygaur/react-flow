import { logout } from "../lib/utils";

export default function LogoutBtn(){
    return(
        <div>

        <button className="btn btn-error absolute top-5 right-20 z-10 text-gray-100"   onClick={() =>
            (
                document.getElementById("my_modal_3") as HTMLDialogElement
            )?.showModal()
        }  >Logout</button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box rounded-lg">
            <h2 className="text-xl mb-4 font-semibold">Are you absolutely sure?</h2>
                
            <form method="dialog" className="flex gap-4 items-center justify-end" >
                    <button className="btn" >Cancel</button>
                <button onClick={logout} className="btn btn-error text-gray-100" >Logout</button>
            </form>
            </div>

            {/* Close dialog when user click outside dialog */}
            <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>

        </dialog>

        </div>
    )
}