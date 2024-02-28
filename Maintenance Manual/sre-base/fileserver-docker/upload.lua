local upload = require "resty.upload"

local function my_get_file_name(header)
    local file_name
    for i, ele in ipairs(header) do
        file_name = string.match(ele, 'filename="(.*)"')
        if file_name and file_name ~= '' then
            return file_name
        end
    end
    return nil
end

local chunk_size = 4096
local form = upload:new(chunk_size)
local file
local file_path
while true do
    local typ, res, err = form:read()

    if not typ then
         ngx.say("failed to read: ", err)
         return
    end

    if typ == "header" then
        local file_name = my_get_file_name(res)
        if file_name then
            file_path = ngx.var.store_path..file_name
            file_root_path = string.gsub(file_path, "(.*/)(.*)", "%1")
            create_path = os.execute("mkdir -p " .. file_root_path)
            if create_path == 0 then
                -- do nothing
            else
                ngx.say("failed to create subpath ", file_root_path)
                return
            end
            file = io.open(file_path, "w+")
            if not file then
                ngx.say("failed to open file ", file_path)
                return
            end
        end

    elseif typ == "body" then
        if file then
            file:write(res)
        end

    elseif typ == "part_end" then
        if file then
            file:close()
            file = nil
            ngx.say("upload to "..file_path.." successfully!")
        end
    elseif typ == "eof" then
        break

    else
        -- do nothing
    end
end
