
// TypeScript file

declare namespace Zlib
{
    export class Deflate
    {
        public constructor(a:Uint8Array, opt?:any);
        public compress():Uint8Array;
    }
    export class Inflate
    {
        public constructor(a:Uint8Array);
        public decompress():Uint8Array;
    }
    
}