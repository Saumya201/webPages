/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>
#include<string>
using namespace std;

int main()
{
    void removespaces(const string& res){
        for(int i=0;i<res.length;i++){
            if(res[i]==' '){
                for(int j=i;j<res.length;j++){
                    res[j]=res[j+1];
                }
                res.length--
            }
        }
    }
    string str="  Hello W  orld   ";
    removespaces(str);
    cout<<str;
    return 0;
}