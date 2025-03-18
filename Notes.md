import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
next.js 
Ts

     ```

     <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button>
            <UserCircle className="w-8 h-8 text-white cursor-pointer rounded-full" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" className="bg-[#1f2937] text-white rounded-md shadow-lg p-2 w-48">
          {user ? (
            <>
              <div className="px-4 py-2 text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <DropdownMenu.Item
                className="hover:bg-red-600 cursor-pointer text-center py-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  Logoutpath()
                }}
              >
                Logout
              </DropdownMenu.Item>
            </>
          ) : (
            <DropdownMenu.Item className="text-center py-2">
              <a href="/login" className="text-blue-400 hover:underline">Login</a>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      ```