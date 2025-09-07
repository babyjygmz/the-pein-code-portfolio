using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Simple Calculator");
        
        Console.Write("Enter first number: ");
        int num1 = Convert.ToInt32(Console.ReadLine());
        
        Console.Write("Enter second number: ");
        int num2 = Convert.ToInt32(Console.ReadLine());
        
        Console.Write("Enter operation (+, -, *, /): ");
        string op = Console.ReadLine();
        
        int result = 0;
        
        if (op == "+")
            result = num1 + num2;
        else if (op == "-")
            result = num1 - num2;
        else if (op == "*")
            result = num1 * num2;
        else if (op == "/")
            result = num1 / num2;
            
        Console.WriteLine($"Result: {result}");
        Console.ReadKey();
    }
}